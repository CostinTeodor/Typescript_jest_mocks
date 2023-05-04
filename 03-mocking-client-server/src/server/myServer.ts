import { Server as WsServer, WebSocket as WebSocketType } from "ws";

import { EventEmitter } from "events";

class CustomEventEmitter extends EventEmitter {}

export class MyServer {
  private server: WsServer;
  private eventEmitter: CustomEventEmitter;

  constructor(port: number) {
    this.server = new WsServer({ port });
    this.eventEmitter = new CustomEventEmitter();

    console.log(`Server is running on port ${port}`);

    this.server.on("connection", (socket: WebSocketType) => {
      console.log("Client connected.");

      socket.on("message", (message: string) => {
        const { topic, data } = JSON.parse(message);
        this.eventEmitter.emit(topic, data, socket);
      });

      socket.on("close", () => {
        console.log("Client disconnected.");
      });
    });

    this.eventEmitter.on(
      "subscribe",
      (topic: string, socket: WebSocketType) => {
        console.log(`Client subscribed to: ${topic}`);
      }
    );

    this.eventEmitter.on(
      "publish",
      (message: string, socket: WebSocketType) => {
        console.log(`Message from client: ${message}`);
      }
    );

    this.eventEmitter.on("unsubscribe", () => {
      console.log(`Client unsubscribed`);
    });
  }
}
