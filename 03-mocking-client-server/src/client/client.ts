import { WebSocket as WebSocketType } from "ws";
const WebSocket = require("ws");
import * as readlineSync from "readline-sync";

export class MyClient {
  private socket: WebSocketType;
  private subscribedTopic: string | null = null;
  private attribute: any;
    constructor(url: string) {
    this.socket = new WebSocket(url);
    this.socket.on("open", () => {
      this.processCommands();
    });
  }

  subscribe(topic: string) {
    if (this.subscribedTopic) {
      console.log("You are already subscribed to a topic.");
      return;
    }
    this.subscribedTopic = topic;
    this.socket.send(JSON.stringify({ topic: "subscribe", data: topic }));
  }

  unsubscribe() {
    this.subscribedTopic = null;
  }

  publish(message: string) {
    if (!this.subscribedTopic) {
      console.log("You must subscribe to a topic before publishing.");
      return;
    }
    this.socket.send(JSON.stringify({ topic: "publish", data: message }));
  }

  disconnect() {
    this.socket.close();
  }

  processCommands() {
    let command = readlineSync.question("Enter a command: ");
    let [action, ...rest] = command.split(" ");
    let argument = rest.join(" ");

    while (action !== "disconnect") {
      switch (action) {
        case "subscribe":
          this.subscribe(argument);
          break;
        case "publish":
          this.publish(argument);
          break;
        case "unsubscribe":
          this.unsubscribe();
          break;
        default:
          console.log("Invalid command");
      }

      command = readlineSync.question("Enter a command: ");
      [action, ...rest] = command.split(" ");
      argument = rest.join(" ");
    }

    this.disconnect();
  }

  processMessage(callback: (message: string) => void) {
    this.socket.on("message", (data: Buffer[]) => {
      const messageStr = Buffer.concat(data).toString();
      const message = JSON.parse(messageStr);
      if (message.topic === this.subscribedTopic) {
        this.attribute = callback(message.data);
      }
    });
  }
  
  }

const client = new MyClient("ws://localhost:8080");

client.subscribe("someTopic");

// client.processMessage((message) => {
//   console.log("Received message:", message);
//   const modifiedMessage = message.toUpperCase() + " - PROCESSED";
//   client.publish(modifiedMessage);
// });
