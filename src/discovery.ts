import { MarketInterface, TradeType } from 'tradeCore';
import TraderClientInterface from './grpcClientInterface';

export interface DiscoveryOpts {
  market: MarketInterface;
  amount: number;
  asset: string;
  type: TradeType;
}

export type Discovery = (
  clients: TraderClientInterface[],
  discoveryOpts: DiscoveryOpts,
  errorHandler?: (err: any) => Promise<void>
) => Promise<TraderClientInterface[]>;

// combine several discoveries function
// each function will be applied in the order specified in discoveries
export function combineDiscovery(...discoveries: Discovery[]): Discovery {
  return async (
    clients: TraderClientInterface[],
    opts: DiscoveryOpts,
    errorHandler?: (err: any) => Promise<void>
  ) => {
    let results = clients;
    for (const discovery of discoveries) {
      if (results.length <= 1) return results;
      results = await discovery(results, opts, errorHandler);
    }

    return results;
  };
}

// bestBalanceDiscovery returns the clients with the greater balance.
// according to trade's type: BUY = max base balance, SELL = max quote balance.
export const bestBalanceDiscovery: Discovery = async (
  clients: TraderClientInterface[],
  opts: DiscoveryOpts,
  errorHandler?: (err: any) => Promise<void>
) => {
  const balancesPromises = clients.map(client => client.balances(opts.market));
  const balancesPromisesResults = await Promise.allSettled(balancesPromises);

  let bestTraders: TraderClientInterface[] = [];
  let maxAmount = 0;

  let index = 0;
  for (const result of balancesPromisesResults) {
    if (result.status === 'fulfilled') {
      const balance = result.value[0].balance;
      if (!balance) {
        if (errorHandler)
          await errorHandler('unknown error, balance is undefined');
        continue;
      }

      const amount =
        opts.type === TradeType.BUY ? balance.baseAmount : balance.quoteAmount;

      if (maxAmount < amount) {
        maxAmount = amount;
        bestTraders = [clients[index]];
      }

      if (amount === maxAmount) {
        bestTraders.push(clients[index]);
      }
    } else if (result.status === 'rejected' && errorHandler) {
      await errorHandler(result.reason);
    }

    index++;
  }

  return bestTraders;
};
