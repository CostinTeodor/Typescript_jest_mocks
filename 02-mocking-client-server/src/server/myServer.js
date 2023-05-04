"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyServer = void 0;
var ws_1 = require("ws");
var events_1 = require("events");
var CustomEventEmitter = /** @class */ (function (_super) {
    __extends(CustomEventEmitter, _super);
    function CustomEventEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomEventEmitter;
}(events_1.EventEmitter));
var MyServer = /** @class */ (function () {
    function MyServer(port) {
        var _this = this;
        this.server = new ws_1.Server({ port: port });
        this.eventEmitter = new CustomEventEmitter();
        console.log("Server is running on port ".concat(port));
        this.server.on('connection', function (socket) {
            console.log('Client connected.');
            socket.on('message', function (message) {
                var _a = JSON.parse(message), topic = _a.topic, data = _a.data;
                _this.eventEmitter.emit(topic, data, socket);
            });
            socket.on('close', function () {
                console.log('Client disconnected.');
            });
        });
        this.eventEmitter.on('subscribe', function (topic, socket) {
            console.log("Client subscribed to: ".concat(topic));
        });
        this.eventEmitter.on('publish', function (message, socket) {
            console.log("Message from client: ".concat(message));
        });
    }
    return MyServer;
}());
exports.MyServer = MyServer;
