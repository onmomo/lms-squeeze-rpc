import { SqueezeServerStub } from "./squeezeServerStub";
import { SqueezeServer } from "./squeezeServer";
import { SqueezePlayer } from "./squeezePlayer";

async function example() {
    var clientAdress = "http://192.168.178.30:9000";
    var client = new SqueezeServerStub(clientAdress);

    var server = new SqueezeServer(client);
    var playerInfos = await server.getPlayerInfosAsync();
    var playerInfo = playerInfos && playerInfos[0];
    var player = playerInfo && new SqueezePlayer(client, playerInfo);

    await player.setVolumeAsync(10);
    console.log(await player.getStatusAsync());
    await player.setVolumeAsync(20);
    console.log(await player.getStatusAsync());
}

example();
