/* eslint-disable */
// @generated by protobuf-ts 2.4.0 with parameter client_grpc1,add_pb_suffix,eslint_disable,ts_nocheck,// @generated from protobuf file "tdex/v1/transport.proto" (package "tdex.v1", syntax proto3),// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message tdex.v1.SupportedContentTypesRequest
 */
export interface SupportedContentTypesRequest {
}
/**
 * @generated from protobuf message tdex.v1.SupportedContentTypesResponse
 */
export interface SupportedContentTypesResponse {
    /**
     * @generated from protobuf field: repeated tdex.v1.ContentType accepted_types = 1;
     */
    acceptedTypes: ContentType[];
}
/**
 * @generated from protobuf enum tdex.v1.ContentType
 */
export enum ContentType {
    /**
     * @generated from protobuf enum value: CONTENT_TYPE_JSON = 0;
     */
    JSON = 0,
    /**
     * @generated from protobuf enum value: CONTENT_TYPE_GRPC = 1;
     */
    GRPC = 1,
    /**
     * @generated from protobuf enum value: CONTENT_TYPE_GRPCWEB = 2;
     */
    GRPCWEB = 2,
    /**
     * @generated from protobuf enum value: CONTENT_TYPE_GRPCWEBTEXT = 3;
     */
    GRPCWEBTEXT = 3
}
// @generated message type with reflection information, may provide speed optimized methods
class SupportedContentTypesRequest$Type extends MessageType<SupportedContentTypesRequest> {
    constructor() {
        super("tdex.v1.SupportedContentTypesRequest", []);
    }
    create(value?: PartialMessage<SupportedContentTypesRequest>): SupportedContentTypesRequest {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SupportedContentTypesRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SupportedContentTypesRequest): SupportedContentTypesRequest {
        return target ?? this.create();
    }
    internalBinaryWrite(message: SupportedContentTypesRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex.v1.SupportedContentTypesRequest
 */
export const SupportedContentTypesRequest = new SupportedContentTypesRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SupportedContentTypesResponse$Type extends MessageType<SupportedContentTypesResponse> {
    constructor() {
        super("tdex.v1.SupportedContentTypesResponse", [
            { no: 1, name: "accepted_types", kind: "enum", repeat: 1 /*RepeatType.PACKED*/, T: () => ["tdex.v1.ContentType", ContentType, "CONTENT_TYPE_"] }
        ]);
    }
    create(value?: PartialMessage<SupportedContentTypesResponse>): SupportedContentTypesResponse {
        const message = { acceptedTypes: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SupportedContentTypesResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SupportedContentTypesResponse): SupportedContentTypesResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated tdex.v1.ContentType accepted_types */ 1:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.acceptedTypes.push(reader.int32());
                    else
                        message.acceptedTypes.push(reader.int32());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SupportedContentTypesResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated tdex.v1.ContentType accepted_types = 1; */
        if (message.acceptedTypes.length) {
            writer.tag(1, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.acceptedTypes.length; i++)
                writer.int32(message.acceptedTypes[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex.v1.SupportedContentTypesResponse
 */
export const SupportedContentTypesResponse = new SupportedContentTypesResponse$Type();
/**
 * @generated ServiceType for protobuf service tdex.v1.TransportService
 */
export const TransportService = new ServiceType("tdex.v1.TransportService", [
    { name: "SupportedContentTypes", options: { "google.api.http": { get: "/v1/transport" } }, I: SupportedContentTypesRequest, O: SupportedContentTypesResponse }
]);
