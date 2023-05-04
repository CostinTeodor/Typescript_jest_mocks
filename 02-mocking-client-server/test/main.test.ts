import { startServer } from "../src/main";
import { MySimpleServer } from "../src/__mocks__/mySimpleServer";
import { MockedServer } from "../src/__mocks__/server";
import { MockedClient } from "../src/__mocks__/client";

describe("Testing the simple server", () => {
  test("Server", () => {
    jest.mock("../src/main", () => ({
      Server: MySimpleServer,
      startServer,
    }));

    const { Server } = require("../src/main");

    const server = new Server();

    startServer(server);
    console.log("test");
    expect(server).toBeInstanceOf(MySimpleServer);

    jest.restoreAllMocks();
  });
});

describe("Testing the more complex Server and Client", () => {
  test("Publish and Subscribe methods", () => {
    jest.mock("../src/server/myServer", () => {
      MyServer: MockedServer
    })
    jest.mock("../src/client/client", () => {
      MyClient: MockedClient
    })

    const { MyServer } = require("../src/server/myServer");
    const {MyClient } = require("../src/client/client");

    

  });
});
