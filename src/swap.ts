import Core from './core';
import {confidential, Psbt, Transaction, TxOutput} from 'liquidjs-lib';
import * as proto from 'api-spec/protobuf/gen/js/tdex/v1/swap_pb';
import * as jspb from 'google-protobuf';
import {isConfidentialOutput} from 'ldk';
import {decodePsbt, makeid} from 'utils';

// type for BlindingKeys
type BlindKeysMap = Record<string, Buffer>;

// define the Swap.request arguments.
interface requestOpts {
  assetToBeSent: string;
  amountToBeSent: number;
  assetToReceive: string;
  amountToReceive: number;
  psetBase64: string;
  inputBlindingKeys?: BlindKeysMap;
  outputBlindingKeys?: BlindKeysMap;
}

// define the Swap.accept arguments.
interface acceptOpts {
  message: Uint8Array;
  psetBase64: string;
  inputBlindingKeys?: BlindKeysMap;
  outputBlindingKeys?: BlindKeysMap;
}

/**
 * The Swap class implements the Swap TDEX protocol i.e swap.request, swap.accept and swap.complete.
 * @see https://github.com/TDex-network/tdex-specs/blob/master/03-swap-protocol.md
 */
export class Swap extends Core {
  static parse = parse;

  /**
   * Create and serialize a SwapRequest Message.
   * @param args the args of swap.request see requestOpts.
   */
  async request({
                  amountToBeSent,
                  assetToBeSent,
                  amountToReceive,
                  assetToReceive,
                  psetBase64,
                  inputBlindingKeys,
                  outputBlindingKeys,
                }: requestOpts): Promise<Uint8Array> {
    // Check amounts
    const msg = proto.SwapRequest.create({
      id: makeid(8),
      amountP: BigInt(amountToBeSent),
      assetP: assetToBeSent,
      amountR: BigInt(amountToReceive),
      assetR: assetToReceive,
      transaction: psetBase64
    });

    if (inputBlindingKeys) {
      // set the input blinding keys
      Object.entries(inputBlindingKeys).forEach(([key, value]) => {
        msg.inputBlindingKey[key] = Uint8Array.from(value);
      });
    }

    if (outputBlindingKeys) {
      // set the output blinding keys
      Object.entries(outputBlindingKeys).forEach(([key, value]) => {
        msg.outputBlindingKey[key] = Uint8Array.from(value);
      });
    }

    // check the message content and transaction.
    await compareMessagesAndTransaction(msg);

    if (this.verbose) console.log(proto.SwapRequest.toJsonString(msg));

    return proto.SwapRequest.toBinary(msg);
  }

  /**
   * Create and serialize an accept message.
   * @param args the Swap.accept args, see AcceptOpts.
   */
  async accept({
                 message,
                 psetBase64,
                 inputBlindingKeys,
                 outputBlindingKeys,
               }: acceptOpts): Promise<Uint8Array> {
    // deserialize message parameter to get the SwapRequest message.
    const msgRequest = proto.SwapRequest.fromBinary(message);
    // Build Swap Accept message
    const msgAccept = proto.SwapAccept.create({id: makeid(8), requestId: msgRequest.id, transaction: psetBase64});

    if (inputBlindingKeys) {
      // set the input blinding keys
      Object.entries(inputBlindingKeys).forEach(([key, value]) => {
        msgAccept.inputBlindingKey[key] = Uint8Array.from(value);
      });
    }

    if (outputBlindingKeys) {
      // set the output blinding keys
      Object.entries(outputBlindingKeys).forEach(([key, value]) => {
        msgAccept.outputBlindingKey[key] = Uint8Array.from(value);
      });
    }

    // compare messages and transaction data
    await compareMessagesAndTransaction(msgRequest, msgAccept);

    if (this.verbose) console.log(proto.SwapAccept.toJsonString(msgAccept));

    // serialize the SwapAccept message.
    return proto.SwapAccept.toBinary(msgAccept);
  }

  /**
   * create and serialize a SwapComplete message.
   * @param args contains the SwapAccept message + the base64 encoded transaction.
   */
  complete({
             message,
             psetBase64OrHex,
           }: {
    message: Uint8Array;
    psetBase64OrHex: string;
  }): Uint8Array {
    const msgAccept = proto.SwapAccept.fromBinary(message);
    //Build SwapComplete
    const msgComplete = proto.SwapComplete.create({
      id: makeid(8),
      acceptId: msgAccept.id,
      transaction: psetBase64OrHex
    });

    if (this.verbose) console.log(proto.SwapAccept.toJsonString(msgAccept));

    return proto.SwapComplete.toBinary(msgComplete);
  }
}

/**
 * Take a swap messages and check if the message's data is corresponding to the  msg's transaction.
 * @param msgRequest the swap request message.
 * @param msgAccept the swap accept message.
 */
async function compareMessagesAndTransaction(
  msgRequest: proto.SwapRequest,
  msgAccept?: proto.SwapAccept
): Promise<void> {
  // decode the transaction.
  const decodedFromRequest = decodePsbt(msgRequest.transaction);

  // nonWitnessUtxo to witnessUtxoutxos
  decodedFromRequest.psbt.data.inputs.forEach((i: any, inputIndex: number) => {
    if (!i.witnessUtxo && i.nonWitnessUtxo) {
      const vout: number = decodedFromRequest.transaction.ins[inputIndex].index;
      const witnessUtxo: TxOutput = Transaction.fromHex(i.nonWitnessUtxo).outs[
        vout
        ];
      i.witnessUtxo = witnessUtxo;
    }
  });

  // check the amount of the transaction
  const totalP = await countUtxos(
    decodedFromRequest.psbt,
    msgRequest.assetP,
    blindKeysMap(msgRequest.inputBlindingKey)
  );

  if (totalP < msgRequest.getAmountP()) {
    throw new Error(
      'Cumulative utxos count is not enough to cover SwapRequest.amount_p'
    );
  }

  // check if the output if found in the transaction
  const outputRFound: boolean = await outputFoundInTransaction(
    decodedFromRequest.transaction.outs,
    Number(msgRequest.amountR),
    msgRequest.assetR,
    blindKeysMap(msgRequest.outputBlindingKey)
  );

  if (!outputRFound)
    throw new Error(
      `Either SwapRequest.amount_r or SwapRequest.asset_r do not match the provided psbt (amount: ${msgRequest.amountR.toString()}, asset: ${msgRequest.assetR})`
    );

  // msg accept
  if (msgAccept) {
    // decode the tx and check the msg's ids
    const decodedFromAccept = decodePsbt(msgAccept.transaction);
    if (msgRequest.id !== msgAccept.requestId)
      throw new Error(
        'SwapRequest.id and SwapAccept.request_id are not the same'
      );

    // check the amount of utxos.
    const totalR = await countUtxos(
      decodedFromAccept.psbt,
      msgRequest.assetR,
      blindKeysMap(msgAccept.inputBlindingKey)
    );

    if (totalR < msgRequest.amountR) {
      throw new Error(
        'Cumulative utxos count is not enough to cover SwapRequest.amount_r'
      );
    }

    // check if there is an output found in the transaction.
    const outputPFound = outputFoundInTransaction(
      decodedFromAccept.transaction.outs,
      Number(msgRequest.amountP),
      msgRequest.assetP,
      blindKeysMap(msgAccept.outputBlindingKey)
    );

    if (!outputPFound)
      throw new Error(
        `Either SwapRequest.amount_p or SwapRequest.asset_p do not match the provided psbt amount=${msgRequest.amountP} asset=${msgRequest.assetP}`
      );
  }
}

/**
 * find an output in outputs corresponding to value and asset. Provide outputBlindKeys if output are blinded.
 * @param outputs the outputs to search in.
 * @param value value of the output.
 * @param asset hex encoded asset of the output.
 * @param outputBlindKeys optional, only if blinded outputs. Blinding keys map (scriptPukKey -> blindingKey).
 */
async function outputFoundInTransaction(
  outputs: Array<TxOutput>,
  value: number,
  asset: string,
  outputBlindKeys: BlindKeysMap = {}
): Promise<boolean> {
  return outputs.some(async (o: TxOutput) => {
    // unblind first if confidential ouput
    const isConfidential = isConfidentialOutput(o);
    if (isConfidential === true) {
      const blindKey: Buffer = outputBlindKeys[o.script.toString('hex')];
      // if no blinding keys for the confidential ouput --> return false
      if (blindKey === undefined)
        throw new Error(`no blind key for ${o.script.toString('hex')}`);
      try {
        const {
          value: unblindValue,
          asset: unblindAsset,
        } = await confidential.unblindOutputWithKey(o, blindKey);
        // check unblind value and unblind asset
        return (
          parseInt(unblindValue, 10) === value &&
          unblindAsset
            .slice(1)
            .reverse()
            .toString('hex') === asset
        );
      } catch (_) {
        // if unblind fail --> return false
        return false;
      }
    }
    // check value and asset
    const assetBuffer: Buffer = Buffer.from(asset, 'hex').reverse();
    const isAsset: boolean = assetBuffer.equals(o.asset.slice(1));
    const isValue: boolean =
      confidential.confidentialValueToSatoshi(o.value) === value;
    return isAsset && isValue;
  });
}

/**
 * Returns the sum of the values of the given inputs' utxos.
 * @param pset the pset to count inputs values.
 * @param asset the asset to fetch value.
 * @param inputBlindKeys optional, the blinding keys using to unblind witnessUtxo if blinded.
 */
async function countUtxos(
  pset: Psbt,
  asset: string,
  inputBlindKeys: BlindKeysMap = {}
): Promise<number> {
  const assetBuffer: Buffer = Buffer.from(asset, 'hex').reverse();
  const filteredByWitness = pset.data.inputs.filter(i => i.witnessUtxo != null);

  // unblind confidential prevouts
  const unblindedUtxos = await Promise.all(
    filteredByWitness.map(async i => {
      if (i.witnessUtxo && isConfidentialOutput(i.witnessUtxo)) {
        const blindKey = inputBlindKeys[i.witnessUtxo.script.toString('hex')];
        if (blindKey === undefined) {
          throw new Error(
            'no blindKey for script: ' + i.witnessUtxo.script.toString('hex')
          );
        }
        const {
          value: unblindValue,
          asset: unblindAsset,
        } = await confidential.unblindOutputWithKey(i.witnessUtxo, blindKey);
        return {
          asset: unblindAsset,
          value: unblindValue,
        };
      }
      return {
        asset: i.witnessUtxo!.asset,
        value: i.witnessUtxo!.value,
      };
    })
  );

  // filter inputs by asset and return the the count
  const filteredByAsset = unblindedUtxos.filter(({asset}) =>
    assetBuffer.equals(asset.length === 33 ? asset.slice(1) : asset)
  );
  const queryValues = filteredByAsset.map(({value}) => {
    const valAsNumber: number =
      value instanceof Buffer
        ? confidential.confidentialValueToSatoshi(value)
        : parseInt(value, 10);

    return valAsNumber;
  });

  // apply reducer to values (add the values)
  return queryValues.reduce((a: number, b: number) => a + b, 0);
}

function parse({
                 message,
                 type,
               }: {
  message: Uint8Array;
  type: string;
}): string {
  let msg: any;
  try {
    msg = (proto as any)[type].deserializeBinary(message);
  } catch (e) {
    throw new Error(`Not valid message of expected type ${type}`);
  }

  return JSON.stringify(msg.toObject(), undefined, 2);
}

/**
 * Convert jspb's Map type to BlindKeysMap.
 * @param jspbMap the map to convert.
 */
export function blindKeysMap(
  jspbMap: jspb.Map<string, string | Uint8Array>
): BlindKeysMap | undefined {
  const map: BlindKeysMap = {};
  jspbMap.forEach((entry: string | Uint8Array, key: string) => {
    const value: Buffer =
      entry instanceof Uint8Array
        ? Buffer.from(entry)
        : Buffer.from(entry, 'hex');

    map[key] = value;
  });
  return map;
}
