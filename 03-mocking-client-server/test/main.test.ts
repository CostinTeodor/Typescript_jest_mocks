import { MockedServer } from "../src/__mocks__/server";
import { MockedClient } from "../src/__mocks__/client";

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

    expect(client.subscribe()).toBe("Subscribed to a topic");
    expect(client.unsubscribe()).toBe("Unsubscribed from a topic");
    expect(client.publish()).toBe("Published a message");
    expect(client.disconnect()).toBe("Disconnected");
  });
});
