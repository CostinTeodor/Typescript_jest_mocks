"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var readlineSync = require("readline-sync");
var MyClient = /** @class */ (function () {
    function MyClient(url) {
        var _this = this;
        this.subscribedTopic = null;
        this.socket = new WebSocket(url);
        this.socket.on("open", function () {
            _this.processCommands();
        });
    }
    MyClient.prototype.subscribe = function (topic) {
        if (this.subscribedTopic) {
            console.log("You are already subscribed to a topic.");
            return;
        }
        this.subscribedTopic = topic;
        this.socket.send(JSON.stringify({ topic: "subscribe", data: topic }));
    };
    MyClient.prototype.unsubscribe = function () {
        this.subscribedTopic = null;
    };
    MyClient.prototype.publish = function (message) {
        if (!this.subscribedTopic) {
            console.log("You must subscribe to a topic before publishing.");
            return;
        }
        this.socket.send(JSON.stringify({ topic: "publish", data: message }));
    };
    MyClient.prototype.disconnect = function () {
        this.socket.close();
    };
    MyClient.prototype.processCommands = function () {
        var _a;
        var command = readlineSync.question("Enter a command: ");
        var _b = command.split(" "), action = _b[0], rest = _b.slice(1);
        var argument = rest.join(" ");
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
            _a = command.split(" "), action = _a[0], rest = _a.slice(1);
            argument = rest.join(" ");
        }
        this.disconnect();
    };
    return MyClient;
}());
var client = new MyClient("ws://localhost:8080");
