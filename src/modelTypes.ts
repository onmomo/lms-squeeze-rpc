export interface IPlayerInfo {
    name: string;
    playerid: string;
};

export interface IServerStatus {
    players: IPlayerInfo[];
};
export interface IPlayerStatus {
    playerid: string;
    name: string;
    power: boolean;
    volume: number;
    repeat: boolean;
    duration: number;
    time: number;
    title: string;
    artist: string;
    album: string;
    playing: boolean;
}