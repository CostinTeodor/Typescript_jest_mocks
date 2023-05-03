import { startServer } from "../src/main";

class MySimpleServer {
  constructor() {
    console.log("constructed mocked");
  }
  start() {
    console.log("Starting server");
  }
}

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
    
  })
})
