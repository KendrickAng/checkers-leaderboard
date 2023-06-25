/* eslint-disable */
import { Params } from "../leaderboard/params";
import { PlayerInfo } from "../leaderboard/player_info";
import { Board } from "../leaderboard/board";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "checkersleaderboard.leaderboard";

/** GenesisState defines the leaderboard module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  port_id: string;
  playerInfoList: PlayerInfo[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  board: Board | undefined;
}

const baseGenesisState: object = { port_id: "" };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.port_id !== "") {
      writer.uint32(18).string(message.port_id);
    }
    for (const v of message.playerInfoList) {
      PlayerInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.board !== undefined) {
      Board.encode(message.board, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.playerInfoList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.port_id = reader.string();
          break;
        case 3:
          message.playerInfoList.push(
            PlayerInfo.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.board = Board.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.playerInfoList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.port_id = String(object.port_id);
    } else {
      message.port_id = "";
    }
    if (object.playerInfoList !== undefined && object.playerInfoList !== null) {
      for (const e of object.playerInfoList) {
        message.playerInfoList.push(PlayerInfo.fromJSON(e));
      }
    }
    if (object.board !== undefined && object.board !== null) {
      message.board = Board.fromJSON(object.board);
    } else {
      message.board = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.port_id !== undefined && (obj.port_id = message.port_id);
    if (message.playerInfoList) {
      obj.playerInfoList = message.playerInfoList.map((e) =>
        e ? PlayerInfo.toJSON(e) : undefined
      );
    } else {
      obj.playerInfoList = [];
    }
    message.board !== undefined &&
      (obj.board = message.board ? Board.toJSON(message.board) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.playerInfoList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.port_id = object.port_id;
    } else {
      message.port_id = "";
    }
    if (object.playerInfoList !== undefined && object.playerInfoList !== null) {
      for (const e of object.playerInfoList) {
        message.playerInfoList.push(PlayerInfo.fromPartial(e));
      }
    }
    if (object.board !== undefined && object.board !== null) {
      message.board = Board.fromPartial(object.board);
    } else {
      message.board = undefined;
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
