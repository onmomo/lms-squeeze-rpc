import { SqueezeServerStub } from "./squeezeServerStub";
import { IPlayerInfo, IPlayerStatus } from "./modelTypes";
import { IRpcResponsePlayerStatus, IRpcResponsePlaylistItem } from "./slimTypes";

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
    public async getStatusAsync(): Promise<IPlayerStatus | undefined> {
        let status = await this._stub.requestAsync<IRpcResponsePlayerStatus>([this._id, ["status", "-", 1, "tags:cgABbehldiqtyrSuoKLNJ"]]);
        if (!status) {
            return undefined;
        }
        let cur_playlist_item: IRpcResponsePlaylistItem | undefined;
        if (status.playlist_cur_index != null && Array.isArray(status.playlist_loop)) {
            status.playlist_loop.some((item) => {
                if (+item["playlist index"] === +status.playlist_cur_index) {
                    cur_playlist_item = item;
                    return true;
                }
            });
        }
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
