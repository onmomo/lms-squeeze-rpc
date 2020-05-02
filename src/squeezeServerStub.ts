import * as jayson from "jayson";
import * as url from "url";

export class SqueezeServerStub {
    private _url: url.UrlWithStringQuery;
    private _client: jayson.HttpClient;

    public constructor(serverAdress: string) {
        this._url = url.parse(`${serverAdress}/jsonrpc.js`)
        this._client = jayson.Client.http(this._url);
    }

    public async requestAsync<TResponse>(request: any): Promise<TResponse> {
        return new Promise<TResponse>((resolve, reject) => {
            this._client.request("slim.request", request, (err: any, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.result);
                }
            })
        });
    }
}