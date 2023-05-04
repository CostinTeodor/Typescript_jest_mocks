import { startServer } from "../src/mySimpleServer";
import { MySimpleServer } from "../src/__mocks__/mySimpleServer";
import { MockedServer } from "../src/__mocks__/server";
import { MockedClient } from "../src/__mocks__/client";

describe("Testing the simple server", () => {
  test("Server", () => {
    jest.mock("../src/mySimpleServer", () => {
      return { Server: MySimpleServer, startServer };
    });

    const { Server } = require("../src/mySimpleServer");

    const server = new Server();

    startServer(server);
    expect(server).toBeInstanceOf(MySimpleServer);

    jest.restoreAllMocks();
  });
});

describe("Testing the more complex Server and Client", () => {
  test("Publish and Subscribe methods", () => {
    jest.mock("../src/server/myServer", () => {
      return { MyServer: MockedServer };
    });
    jest.mock("../src/client/client", () => {
      return { MyClient: MockedClient };
    });

    const { MyServer } = require("../src/server/myServer");
    const { MyClient } = require("../src/client/client");

    const server = new MyServer();
    const client = new MyClient();
  });
});
