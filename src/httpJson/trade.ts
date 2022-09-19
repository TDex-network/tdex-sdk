/// <reference path="./custom.d.ts" />
/**
 * tdex/v1/trade.proto
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: version not set
 *
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from 'url';
import * as isomorphicFetch from 'isomorphic-fetch';
import { Configuration } from './configuration';
import {
  BASE_PATH,
  BaseAPI,
  FetchAPI,
  FetchArgs,
  RequiredError,
} from 'httpJson/common';

/**
 *
 * @export
 * @interface V1Balance
 */
export interface V1Balance {
  /**
   *
   * @type {string}
   * @memberof V1Balance
   */
  baseAmount?: string;
  /**
   *
   * @type {string}
   * @memberof V1Balance
   */
  quoteAmount?: string;
}
/**
 *
 * @export
 * @interface V1BalanceWithFee
 */
export interface V1BalanceWithFee {
  /**
   *
   * @type {V1Balance}
   * @memberof V1BalanceWithFee
   */
  balance?: V1Balance;
  /**
   *
   * @type {V1Fee}
   * @memberof V1BalanceWithFee
   */
  fee?: V1Fee;
}
/**
 *
 * @export
 * @interface V1CompleteTradeRequest
 */
export interface V1CompleteTradeRequest {
  /**
   *
   * @type {V1SwapComplete}
   * @memberof V1CompleteTradeRequest
   */
  swapComplete?: V1SwapComplete;
  /**
   *
   * @type {V1SwapFail}
   * @memberof V1CompleteTradeRequest
   */
  swapFail?: V1SwapFail;
}
/**
 *
 * @export
 * @interface V1CompleteTradeResponse
 */
export interface V1CompleteTradeResponse {
  /**
   *
   * @type {string}
   * @memberof V1CompleteTradeResponse
   */
  txid?: string;
  /**
   *
   * @type {V1SwapFail}
   * @memberof V1CompleteTradeResponse
   */
  swapFail?: V1SwapFail;
}
/**
 *
 * @export
 * @interface V1Fee
 */
export interface V1Fee {
  /**
   *
   * @type {string}
   * @memberof V1Fee
   */
  basisPoint?: string;
  /**
   *
   * @type {V1Fixed}
   * @memberof V1Fee
   */
  fixed?: V1Fixed;
}
/**
 *
 * @export
 * @interface V1Fixed
 */
export interface V1Fixed {
  /**
   *
   * @type {string}
   * @memberof V1Fixed
   */
  baseFee?: string;
  /**
   *
   * @type {string}
   * @memberof V1Fixed
   */
  quoteFee?: string;
}
/**
 *
 * @export
 * @interface V1GetMarketBalanceRequest
 */
export interface V1GetMarketBalanceRequest {
  /**
   *
   * @type {V1Market}
   * @memberof V1GetMarketBalanceRequest
   */
  market?: V1Market;
}
/**
 *
 * @export
 * @interface V1GetMarketBalanceResponse
 */
export interface V1GetMarketBalanceResponse {
  /**
   *
   * @type {V1BalanceWithFee}
   * @memberof V1GetMarketBalanceResponse
   */
  balance?: V1BalanceWithFee;
}
/**
 *
 * @export
 * @interface V1ListMarketsResponse
 */
export interface V1ListMarketsResponse {
  /**
   *
   * @type {Array<V1MarketWithFee>}
   * @memberof V1ListMarketsResponse
   */
  markets?: Array<V1MarketWithFee>;
}
/**
 *
 * @export
 * @interface V1Market
 */
export interface V1Market {
  /**
   *
   * @type {string}
   * @memberof V1Market
   */
  baseAsset?: string;
  /**
   *
   * @type {string}
   * @memberof V1Market
   */
  quoteAsset?: string;
}
/**
 *
 * @export
 * @interface V1MarketWithFee
 */
export interface V1MarketWithFee {
  /**
   *
   * @type {V1Market}
   * @memberof V1MarketWithFee
   */
  market?: V1Market;
  /**
   *
   * @type {V1Fee}
   * @memberof V1MarketWithFee
   */
  fee?: V1Fee;
}
/**
 *
 * @export
 * @interface V1Preview
 */
export interface V1Preview {
  /**
   *
   * @type {V1Price}
   * @memberof V1Preview
   */
  price?: V1Price;
  /**
   *
   * @type {V1Fee}
   * @memberof V1Preview
   */
  fee?: V1Fee;
  /**
   *
   * @type {string}
   * @memberof V1Preview
   */
  amount?: string;
  /**
   *
   * @type {string}
   * @memberof V1Preview
   */
  asset?: string;
  /**
   *
   * @type {V1Balance}
   * @memberof V1Preview
   */
  balance?: V1Balance;
}
/**
 *
 * @export
 * @interface V1PreviewTradeRequest
 */
export interface V1PreviewTradeRequest {
  /**
   *
   * @type {V1Market}
   * @memberof V1PreviewTradeRequest
   */
  market?: V1Market;
  /**
   *
   * @type {V1TradeType}
   * @memberof V1PreviewTradeRequest
   */
  type?: V1TradeType;
  /**
   *
   * @type {string}
   * @memberof V1PreviewTradeRequest
   */
  amount?: string;
  /**
   *
   * @type {string}
   * @memberof V1PreviewTradeRequest
   */
  asset?: string;
}
/**
 *
 * @export
 * @interface V1PreviewTradeResponse
 */
export interface V1PreviewTradeResponse {
  /**
   *
   * @type {Array<V1Preview>}
   * @memberof V1PreviewTradeResponse
   */
  previews?: Array<V1Preview>;
}
/**
 *
 * @export
 * @interface V1Price
 */
export interface V1Price {
  /**
   *
   * @type {number}
   * @memberof V1Price
   */
  basePrice?: number;
  /**
   *
   * @type {number}
   * @memberof V1Price
   */
  quotePrice?: number;
}
/**
 *
 * @export
 * @interface V1ProposeTradeRequest
 */
export interface V1ProposeTradeRequest {
  /**
   *
   * @type {V1Market}
   * @memberof V1ProposeTradeRequest
   */
  market?: V1Market;
  /**
   *
   * @type {V1TradeType}
   * @memberof V1ProposeTradeRequest
   */
  type?: V1TradeType;
  /**
   *
   * @type {V1SwapRequest}
   * @memberof V1ProposeTradeRequest
   */
  swapRequest?: V1SwapRequest;
}
/**
 *
 * @export
 * @interface V1ProposeTradeResponse
 */
export interface V1ProposeTradeResponse {
  /**
   *
   * @type {V1SwapAccept}
   * @memberof V1ProposeTradeResponse
   */
  swapAccept?: V1SwapAccept;
  /**
   *
   * @type {V1SwapFail}
   * @memberof V1ProposeTradeResponse
   */
  swapFail?: V1SwapFail;
  /**
   *
   * @type {string}
   * @memberof V1ProposeTradeResponse
   */
  expiryTimeUnix?: string;
}
/**
 *
 * @export
 * @interface V1SwapAccept
 */
export interface V1SwapAccept {
  /**
   *
   * @type {string}
   * @memberof V1SwapAccept
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapAccept
   */
  requestId?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapAccept
   */
  transaction?: string;
  /**
   * In case of a confidential transaction the blinding key of each confidential input is included. Each blinding key is identified by the prevout script hex encoded.
   * @type {{ [key: string]: string; }}
   * @memberof V1SwapAccept
   */
  inputBlindingKey?: { [key: string]: string };
  /**
   * In case of a confidential transaction the blinding key of each confidential output is included. Each blinding key is identified by the output script hex encoded.
   * @type {{ [key: string]: string; }}
   * @memberof V1SwapAccept
   */
  outputBlindingKey?: { [key: string]: string };
}
/**
 *
 * @export
 * @interface V1SwapComplete
 */
export interface V1SwapComplete {
  /**
   *
   * @type {string}
   * @memberof V1SwapComplete
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapComplete
   */
  acceptId?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapComplete
   */
  transaction?: string;
}
/**
 *
 * @export
 * @interface V1SwapFail
 */
export interface V1SwapFail {
  /**
   *
   * @type {string}
   * @memberof V1SwapFail
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapFail
   */
  messageId?: string;
  /**
   *
   * @type {number}
   * @memberof V1SwapFail
   */
  failureCode?: number;
  /**
   *
   * @type {string}
   * @memberof V1SwapFail
   */
  failureMessage?: string;
}
/**
 *
 * @export
 * @interface V1SwapRequest
 */
export interface V1SwapRequest {
  /**
   *
   * @type {string}
   * @memberof V1SwapRequest
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapRequest
   */
  amountP?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapRequest
   */
  assetP?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapRequest
   */
  amountR?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapRequest
   */
  assetR?: string;
  /**
   *
   * @type {string}
   * @memberof V1SwapRequest
   */
  transaction?: string;
  /**
   * In case of a confidential transaction the blinding key of each confidential input is included. Each blinding key is identified by the prevout script hex encoded.
   * @type {{ [key: string]: string; }}
   * @memberof V1SwapRequest
   */
  inputBlindingKey?: { [key: string]: string };
  /**
   * In case of a confidential transaction the blinding key of each confidential output is included. Each blinding key is identified by the output script hex encoded.
   * @type {{ [key: string]: string; }}
   * @memberof V1SwapRequest
   */
  outputBlindingKey?: { [key: string]: string };
}
/**
 *
 * @export
 * @enum {string}
 */
export enum V1TradeType {
  BUY = <any>'TRADE_TYPE_BUY',
  SELL = <any>'TRADE_TYPE_SELL',
}
/**
 * TradeServiceApi - fetch parameter creator
 * @export
 */
export const TradeServiceApiFetchParamCreator = function(
  // @ts-ignore
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary CompleteTrade can be used by the trader to let the daemon finalizing, extracting, and broadcasting the swap transaction, once he's signed his inputs. This is not mandatory, the trader can do the steps above on his own alternatively.
     * @param {V1CompleteTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceCompleteTrade(
      body: V1CompleteTradeRequest,
      options: any = {}
    ): FetchArgs {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          'body',
          'Required parameter body was null or undefined when calling tradeServiceCompleteTrade.'
        );
      }
      const localVarPath = `/v1/trade/complete`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );
      const needsSerialization =
        <any>'V1CompleteTradeRequest' !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body = needsSerialization
        ? JSON.stringify(body || {})
        : body || '';

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary GetMarketBalance retutns the balance of the two current reserves of the given market.
     * @param {V1GetMarketBalanceRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceGetMarketBalance(
      body: V1GetMarketBalanceRequest,
      options: any = {}
    ): FetchArgs {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          'body',
          'Required parameter body was null or undefined when calling tradeServiceGetMarketBalance.'
        );
      }
      const localVarPath = `/v1/market/balance`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );
      const needsSerialization =
        <any>'V1GetMarketBalanceRequest' !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body = needsSerialization
        ? JSON.stringify(body || {})
        : body || '';

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary ListMarkets lists all the markets open for trading.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceListMarkets(options: any = {}): FetchArgs {
      const localVarPath = `/v1/markets`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * The trade type can assume values BUY or SELL and it always refer to the fixed base asset. For example:  * if trade type is BUY, it means the trader wants to buy base asset funds.  * if trade type is SELL, it means the trader wants to sell base asset funds.
     * @summary PreviewTrade returns a counter amount and asset in response to the provided ones and a trade type for a market.
     * @param {V1PreviewTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServicePreviewTrade(
      body: V1PreviewTradeRequest,
      options: any = {}
    ): FetchArgs {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          'body',
          'Required parameter body was null or undefined when calling tradeServicePreviewTrade.'
        );
      }
      const localVarPath = `/v1/trade/preview`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );
      const needsSerialization =
        <any>'V1PreviewTradeRequest' !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body = needsSerialization
        ? JSON.stringify(body || {})
        : body || '';

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary ProposeTrade allows a trader to present a SwapRequest. The service answers with a SwapAccept, filling the request's partial transaction, + an expiration time to complete the swap when accepting the swap, or, otherwise, with a SwapFail containg the reason for the rejection of the proposal.
     * @param {V1ProposeTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceProposeTrade(
      body: V1ProposeTradeRequest,
      options: any = {}
    ): FetchArgs {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          'body',
          'Required parameter body was null or undefined when calling tradeServiceProposeTrade.'
        );
      }
      const localVarPath = `/v1/trade/propose`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );
      const needsSerialization =
        <any>'V1ProposeTradeRequest' !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body = needsSerialization
        ? JSON.stringify(body || {})
        : body || '';

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * TradeServiceApi - functional programming interface
 * @export
 */
export const TradeServiceApiFp = function(configuration?: Configuration) {
  return {
    /**
     *
     * @summary CompleteTrade can be used by the trader to let the daemon finalizing, extracting, and broadcasting the swap transaction, once he's signed his inputs. This is not mandatory, the trader can do the steps above on his own alternatively.
     * @param {V1CompleteTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceCompleteTrade(
      body: V1CompleteTradeRequest,
      options?: any
    ): (
      fetch?: FetchAPI,
      basePath?: string
    ) => Promise<V1CompleteTradeResponse> {
      const localVarFetchArgs = TradeServiceApiFetchParamCreator(
        configuration
      ).tradeServiceCompleteTrade(body, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     *
     * @summary GetMarketBalance retutns the balance of the two current reserves of the given market.
     * @param {V1GetMarketBalanceRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceGetMarketBalance(
      body: V1GetMarketBalanceRequest,
      options?: any
    ): (
      fetch?: FetchAPI,
      basePath?: string
    ) => Promise<V1GetMarketBalanceResponse> {
      const localVarFetchArgs = TradeServiceApiFetchParamCreator(
        configuration
      ).tradeServiceGetMarketBalance(body, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     *
     * @summary ListMarkets lists all the markets open for trading.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceListMarkets(
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<V1ListMarketsResponse> {
      const localVarFetchArgs = TradeServiceApiFetchParamCreator(
        configuration
      ).tradeServiceListMarkets(options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * The trade type can assume values BUY or SELL and it always refer to the fixed base asset. For example:  * if trade type is BUY, it means the trader wants to buy base asset funds.  * if trade type is SELL, it means the trader wants to sell base asset funds.
     * @summary PreviewTrade returns a counter amount and asset in response to the provided ones and a trade type for a market.
     * @param {V1PreviewTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServicePreviewTrade(
      body: V1PreviewTradeRequest,
      options?: any
    ): (
      fetch?: FetchAPI,
      basePath?: string
    ) => Promise<V1PreviewTradeResponse> {
      const localVarFetchArgs = TradeServiceApiFetchParamCreator(
        configuration
      ).tradeServicePreviewTrade(body, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     *
     * @summary ProposeTrade allows a trader to present a SwapRequest. The service answers with a SwapAccept, filling the request's partial transaction, + an expiration time to complete the swap when accepting the swap, or, otherwise, with a SwapFail containg the reason for the rejection of the proposal.
     * @param {V1ProposeTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceProposeTrade(
      body: V1ProposeTradeRequest,
      options?: any
    ): (
      fetch?: FetchAPI,
      basePath?: string
    ) => Promise<V1ProposeTradeResponse> {
      const localVarFetchArgs = TradeServiceApiFetchParamCreator(
        configuration
      ).tradeServiceProposeTrade(body, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
  };
};

/**
 * TradeServiceApi - factory interface
 * @export
 */
export const TradeServiceApiFactory = function(
  configuration?: Configuration,
  fetch?: FetchAPI,
  basePath?: string
) {
  return {
    /**
     *
     * @summary CompleteTrade can be used by the trader to let the daemon finalizing, extracting, and broadcasting the swap transaction, once he's signed his inputs. This is not mandatory, the trader can do the steps above on his own alternatively.
     * @param {V1CompleteTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceCompleteTrade(body: V1CompleteTradeRequest, options?: any) {
      return TradeServiceApiFp(configuration).tradeServiceCompleteTrade(
        body,
        options
      )(fetch, basePath);
    },
    /**
     *
     * @summary GetMarketBalance retutns the balance of the two current reserves of the given market.
     * @param {V1GetMarketBalanceRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceGetMarketBalance(
      body: V1GetMarketBalanceRequest,
      options?: any
    ) {
      return TradeServiceApiFp(configuration).tradeServiceGetMarketBalance(
        body,
        options
      )(fetch, basePath);
    },
    /**
     *
     * @summary ListMarkets lists all the markets open for trading.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceListMarkets(options?: any) {
      return TradeServiceApiFp(configuration).tradeServiceListMarkets(options)(
        fetch,
        basePath
      );
    },
    /**
     * The trade type can assume values BUY or SELL and it always refer to the fixed base asset. For example:  * if trade type is BUY, it means the trader wants to buy base asset funds.  * if trade type is SELL, it means the trader wants to sell base asset funds.
     * @summary PreviewTrade returns a counter amount and asset in response to the provided ones and a trade type for a market.
     * @param {V1PreviewTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServicePreviewTrade(body: V1PreviewTradeRequest, options?: any) {
      return TradeServiceApiFp(configuration).tradeServicePreviewTrade(
        body,
        options
      )(fetch, basePath);
    },
    /**
     *
     * @summary ProposeTrade allows a trader to present a SwapRequest. The service answers with a SwapAccept, filling the request's partial transaction, + an expiration time to complete the swap when accepting the swap, or, otherwise, with a SwapFail containg the reason for the rejection of the proposal.
     * @param {V1ProposeTradeRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    tradeServiceProposeTrade(body: V1ProposeTradeRequest, options?: any) {
      return TradeServiceApiFp(configuration).tradeServiceProposeTrade(
        body,
        options
      )(fetch, basePath);
    },
  };
};

/**
 * TradeServiceApi - object-oriented interface
 * @export
 * @class TradeServiceApi
 * @extends {BaseAPI}
 */
export class TradeServiceApi extends BaseAPI {
  /**
   *
   * @summary CompleteTrade can be used by the trader to let the daemon finalizing, extracting, and broadcasting the swap transaction, once he's signed his inputs. This is not mandatory, the trader can do the steps above on his own alternatively.
   * @param {V1CompleteTradeRequest} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TradeServiceApi
   */
  public tradeServiceCompleteTrade(
    body: V1CompleteTradeRequest,
    options?: any
  ) {
    return TradeServiceApiFp(this.configuration).tradeServiceCompleteTrade(
      body,
      options
    )(this.fetch, this.basePath);
  }

  /**
   *
   * @summary GetMarketBalance retutns the balance of the two current reserves of the given market.
   * @param {V1GetMarketBalanceRequest} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TradeServiceApi
   */
  public tradeServiceGetMarketBalance(
    body: V1GetMarketBalanceRequest,
    options?: any
  ) {
    return TradeServiceApiFp(this.configuration).tradeServiceGetMarketBalance(
      body,
      options
    )(this.fetch, this.basePath);
  }

  /**
   *
   * @summary ListMarkets lists all the markets open for trading.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TradeServiceApi
   */
  public tradeServiceListMarkets(options?: any) {
    return TradeServiceApiFp(this.configuration).tradeServiceListMarkets(
      options
    )(this.fetch, this.basePath);
  }

  /**
   * The trade type can assume values BUY or SELL and it always refer to the fixed base asset. For example:  * if trade type is BUY, it means the trader wants to buy base asset funds.  * if trade type is SELL, it means the trader wants to sell base asset funds.
   * @summary PreviewTrade returns a counter amount and asset in response to the provided ones and a trade type for a market.
   * @param {V1PreviewTradeRequest} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TradeServiceApi
   */
  public tradeServicePreviewTrade(body: V1PreviewTradeRequest, options?: any) {
    return TradeServiceApiFp(this.configuration).tradeServicePreviewTrade(
      body,
      options
    )(this.fetch, this.basePath);
  }

  /**
   *
   * @summary ProposeTrade allows a trader to present a SwapRequest. The service answers with a SwapAccept, filling the request's partial transaction, + an expiration time to complete the swap when accepting the swap, or, otherwise, with a SwapFail containg the reason for the rejection of the proposal.
   * @param {V1ProposeTradeRequest} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TradeServiceApi
   */
  public tradeServiceProposeTrade(body: V1ProposeTradeRequest, options?: any) {
    return TradeServiceApiFp(this.configuration).tradeServiceProposeTrade(
      body,
      options
    )(this.fetch, this.basePath);
  }
}
