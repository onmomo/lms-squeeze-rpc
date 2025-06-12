A simple and lightweight API for interacting with a Logitech Media Server using JSON-RPC.

## Testing Connectivity
To verify the connection to your Logitech Media Server (LMS), execute the following command:

```bash
npm run example http://<LMS-IP>:<PORT>
```

Replace `<LMS-IP>` and `<PORT>` with the IP address and port of your LMS instance. This command will establish a connection to the specified LMS and communicate with one of the detected Squeezebox players.

## Credits
Hard fork from [lms-squeeze-rpc](https://github.com/mepucoac/lms-squeeze-rpc)