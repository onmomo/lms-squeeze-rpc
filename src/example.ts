import { SqueezeServerStub } from "./squeezeServerStub";
import { SqueezeServer } from "./squeezeServer";
import { SqueezePlayer } from "./squeezePlayer";

async function example() {
    var clientAdress = process.argv[2];
    if (!clientAdress) {
        console.error("Usage: node example.js <clientAddress> (e.g. http://192.168.178.30:9000)");
        process.exit(1);
    }
    var client = new SqueezeServerStub(clientAdress);

    var server = new SqueezeServer(client);
    var playerInfos = await server.getPlayerInfosAsync();
    var playerInfo = playerInfos && playerInfos[0];
    var player = playerInfo && new SqueezePlayer(client, playerInfo);
    
    console.log(playerInfo);
    await player.setVolumeAsync(10);
    console.log(await player.getStatusAsync());
    await player.setVolumeAsync(20);
    console.log(await player.getStatusAsync());
}

example();
