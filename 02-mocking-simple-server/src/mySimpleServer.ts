import * as http from "http";

export class Server {
  port = 3000;
  IP = "127.0.0.1";

  constructor(port: number = 3000, IP: string = "127.0.0.1") {
    this.port = port;
    this.IP = IP;
    console.log("constructed");
  }

  start() {
    http
      .createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("hello world!");
        response.end();
      })
      .listen(this.port, this.IP, () => {
        console.log(`Server running at http://${this.IP}:${this.port}/`);
      });
  }
}

export function startServer(server: Server) {
  server.start();
}

// startServer(new Server(3001));
