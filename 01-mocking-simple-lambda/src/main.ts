export class MyClass {
  lambdaTest(fn: (param: string) => any) {
    return fn("Alpha");
  }
}
export function main(myClass: MyClass) {
  return myClass.lambdaTest((input: string) => {
    return input;
  });
}
