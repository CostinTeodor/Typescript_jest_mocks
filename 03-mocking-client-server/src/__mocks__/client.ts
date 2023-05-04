export class MockedClient {
  constructor() {
    console.log("Mocked Client");
  }
  subscribe() {
    return("Subscribed to a topic");
  }
  unsubscribe() {
    return("Unsubscribed from a topic");
  }
  publish() {
    return("Published a message");
  }
  disconnect() {
    return("Disconnected");
  }
}
