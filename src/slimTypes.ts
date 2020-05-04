export type ZeroOrOne = 0 | 1;
export type OnOrOff = "on" | "off";

export interface IRpcResponsePlayerStatus {
    time: number;
    playlist_tracks: number;
    player_name: string;
    digital_volume_control: ZeroOrOne;
    "playlist mode": OnOrOff;
    seq_no: number;
    player_ip: string;
    "mixer volume": number;
    playlist_loop: IRpcResponsePlaylistItem[];
    power: ZeroOrOne;
    current_title: string;
    duration: number;
    remote: ZeroOrOne;
    playlist_cur_index: number;
    player_connected: ZeroOrOne;
    rate: number;
    signalstrength: number;
    "playlist repeat": ZeroOrOne;
    can_seek: ZeroOrOne;
    mode: "play" | "pause" | "stop";
    "playlist shuffle": ZeroOrOne;
    remoteMeta: { id: string; title: string };
    playlist_timestamp: number;
};
export interface IRpcResponsePlaylistItem {
    id: number;
    title: string;
    genre: string;
    artist: string;
    album_id: string;
    album: string;
    duration: number;
    tracknum: string;
    year: string;
    bitrate: string;
    url: string;
    type: string;
    "playlist index": string;
}

export interface IRpcResponseServerStatus {
    "info total songs": number;
    "player count": number;
    "other player count": number;
    ip: string;
    "info total duration": number;
    players_loop: IRpcResponsePlayerInfo[];
    mac: string;
    uuid: string;
    "info total genres": number;
    "info total artists": number;
    "info total albums": number;
    lastscan: string;
    "sn player count": number;
    version: string;
    httpport: string;

}
export interface IRpcResponsePlayerInfo {
    isplayer: ZeroOrOne;
    playerindex: number;
    connected: ZeroOrOne;
    ip: string
    displaytype: string;
    uuid: string;
    playerid: string;
    seq_no: number;
    model: string;
    isplaying: ZeroOrOne;
    canpoweroff: ZeroOrOne;
    power: ZeroOrOne;
    firmware: string;
    modelname: string;
    name: string;
};
