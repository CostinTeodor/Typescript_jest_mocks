export class MockedClient {
  constructor() {
    console.log("Mocked Client");
  }
  subscribe() {
    console.log("Subscribed to a topic");
  }
  unsubscribe() {
    console.log("Unsubscribed from a topic");
  }
  publish() {
    console.log("Published a message");
  }
  disconnect() {
    console.log("Disconnected");
  }
}
