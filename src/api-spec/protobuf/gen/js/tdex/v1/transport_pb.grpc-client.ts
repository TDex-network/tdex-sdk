/* eslint-disable */
// @generated by protobuf-ts 2.4.0 with parameter client_grpc1,add_pb_suffix,eslint_disable,ts_nocheck,// @generated from protobuf file "tdex/v1/transport.proto" (package "tdex.v1", syntax proto3),// tslint:disable
// @ts-nocheck
import { TransportService } from "./transport_pb";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { SupportedContentTypesResponse } from "./transport_pb";
import type { SupportedContentTypesRequest } from "./transport_pb";
import * as grpc from "@grpc/grpc-js";
/**
 * TransportService is used by a Liquidity provider to announce the accepted
 * content types of incoming HTTP request messages.
 *
 * @generated from protobuf service tdex.v1.TransportService
 */
export interface ITransportServiceClient {
    /**
     * @generated from protobuf rpc: SupportedContentTypes(tdex.v1.SupportedContentTypesRequest) returns (tdex.v1.SupportedContentTypesResponse);
     */
    supportedContentTypes(input: SupportedContentTypesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: SupportedContentTypesResponse) => void): grpc.ClientUnaryCall;
    supportedContentTypes(input: SupportedContentTypesRequest, metadata: grpc.Metadata, callback: (err: grpc.ServiceError | null, value?: SupportedContentTypesResponse) => void): grpc.ClientUnaryCall;
    supportedContentTypes(input: SupportedContentTypesRequest, options: grpc.CallOptions, callback: (err: grpc.ServiceError | null, value?: SupportedContentTypesResponse) => void): grpc.ClientUnaryCall;
    supportedContentTypes(input: SupportedContentTypesRequest, callback: (err: grpc.ServiceError | null, value?: SupportedContentTypesResponse) => void): grpc.ClientUnaryCall;
}
/**
 * TransportService is used by a Liquidity provider to announce the accepted
 * content types of incoming HTTP request messages.
 *
 * @generated from protobuf service tdex.v1.TransportService
 */
export class TransportServiceClient extends grpc.Client implements ITransportServiceClient {
    private readonly _binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions>;
    constructor(address: string, credentials: grpc.ChannelCredentials, options: grpc.ClientOptions = {}, binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions> = {}) {
        super(address, credentials, options);
        this._binaryOptions = binaryOptions;
    }
    /**
     * @generated from protobuf rpc: SupportedContentTypes(tdex.v1.SupportedContentTypesRequest) returns (tdex.v1.SupportedContentTypesResponse);
     */
    supportedContentTypes(input: SupportedContentTypesRequest, metadata: grpc.Metadata | grpc.CallOptions | ((err: grpc.ServiceError | null, value?: SupportedContentTypesResponse) => void), options?: grpc.CallOptions | ((err: grpc.ServiceError | null, value?: SupportedContentTypesResponse) => void), callback?: ((err: grpc.ServiceError | null, value?: SupportedContentTypesResponse) => void)): grpc.ClientUnaryCall {
        const method = TransportService.methods[0];
        return this.makeUnaryRequest<SupportedContentTypesRequest, SupportedContentTypesResponse>(`/${TransportService.typeName}/${method.name}`, (value: SupportedContentTypesRequest): Buffer => Buffer.from(method.I.toBinary(value, this._binaryOptions)), (value: Buffer): SupportedContentTypesResponse => method.O.fromBinary(value, this._binaryOptions), input, (metadata as any), (options as any), (callback as any));
    }
}
