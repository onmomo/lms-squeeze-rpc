import { IPlayerInfo, IServerStatus } from "./modelTypes";
import { IRpcResponseServerStatus } from "./slimTypes";
import { SqueezeServerStub } from "./squeezeServerStub";

export class SqueezeServer {
    private _stub: SqueezeServerStub;
    public constructor(stub: SqueezeServerStub) {
        this._stub = stub;
    }
    public async getStatusAsync(): Promise<IServerStatus> {
        var serverInfo = await this.getServerStatusAsync();
        var players = (serverInfo.players_loop || []).map((playerInfo) => {
            return {
                playerid: playerInfo.playerid,
                name: playerInfo.name
            };
        });
        return {
            players
        };
    }
    public async getPlayerInfoByNameAsync(name: string): Promise<IPlayerInfo> {
        var players = await this.getPlayerInfosAsync();
        return players.filter((p) => p.name === name)[0];
    }
    public async getPlayerInfosAsync(): Promise<IPlayerInfo[]> {
        var serverInfo = await this.getServerStatusAsync();
        var players = (serverInfo.players_loop || []).map((playerInfo) => {
            return {
                playerid: playerInfo.playerid,
                name: playerInfo.name
            };
        });
        return players;
    }
    private async getServerStatusAsync(): Promise<IRpcResponseServerStatus> {
        return await this._stub.requestAsync<IRpcResponseServerStatus>(["", ["serverstatus", "0", "999"]]);
    }
}