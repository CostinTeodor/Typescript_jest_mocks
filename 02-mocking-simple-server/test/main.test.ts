import { startServer } from "../src/mySimpleServer";
import { MySimpleServer } from "../src/__mocks__/mySimpleServer";

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