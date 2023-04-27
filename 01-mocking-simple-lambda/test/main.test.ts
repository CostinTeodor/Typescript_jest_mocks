import { MyClass } from "../src/main";

class MockedMyClass {
  myAttribute!: (param: string) => any;

  // lambdaTest(fn: (param: string) => any) {
  //   this.myAttribute = fn;
  // }
}

describe("MockedMyClass", () => {
  beforeAll(()=>jest.clearAllMocks())
  test("testCase1", () => {
    
    const mockedClass = new MockedMyClass();
    mockedClass.myAttribute = jest.fn((param: string) => param);

    const myClass = new MyClass();

    let spy = jest.spyOn(myClass, "lambdaTest").mockImplementation((fn) => fn("Beta"));
    expect(mockedClass.myAttribute("Beta")).toBe("Beta");
    expect(myClass.lambdaTest(mockedClass.myAttribute)).toBe("Beta");
    spy.mockRestore();
  });
});
