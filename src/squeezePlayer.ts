import { SqueezeServerStub } from "./squeezeServerStub";
import { IPlayerInfo, IPlayerStatus } from "./modelTypes";
import { IRpcResponsePlayerStatus } from "./slimTypes";

export class SqueezePlayer {
    private _stub: SqueezeServerStub;
    private _id: string;
    public constructor(stub: SqueezeServerStub, playerInfo: IPlayerInfo | string) {
        this._stub = stub;
        if (typeof (playerInfo) === "string") {
            this._id = playerInfo;
        } else {
            this._id = playerInfo.playerid;
        }

    }
    public async getStatusAsync(): Promise<IPlayerStatus> {
        var status = await this._stub.requestAsync<IRpcResponsePlayerStatus>([this._id, ["status", "-", 1, "tags:cgABbehldiqtyrSuoKLNJ"]]);
        var cur_playlist_item = status && status.playlist_cur_index != null && status.playlist_loop && status.playlist_loop[status.playlist_cur_index] || null;
        return {
            playerid: this._id,
            name: status.player_name,
            power: status.power == 1,
            volume: status["mixer volume"],
            playing: status.mode == "play",
            repeat: status["playlist repeat"] == 1,
            title: cur_playlist_item?.title || "",
            album: cur_playlist_item?.album || "",
            artist: cur_playlist_item?.artist || "",
            duration: cur_playlist_item?.duration || 0,
            time: status.time
        };
    }

    public async setVolumeAsync(volume: number) {
        await this._stub.requestAsync([this._id, ["mixer", "volume", volume]]);
    }
}
