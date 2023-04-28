import { MyClass, main } from "../src/main";

type Callback = (param: string) => any;

describe("temp", () => {
  beforeAll(() => jest.clearAllMocks());

  test("testCase1", () => {
    const myClass = new MyClass();
    const mockedMethod = jest.fn((func: Callback) => "Beta");
    const spy = jest
      .spyOn(myClass, "lambdaTest")
      .mockImplementation(mockedMethod);

    const output = main(myClass);

    expect(spy).toBeCalled();
    expect(output).toBe("Beta");
  });
});
