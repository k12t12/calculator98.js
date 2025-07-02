import {executeSimpleExpression, executeComplexExpression} from "../js/executeExpression";
import {describe,test,expect} from 'vitest'
describe("test for executeSimpleExpression", () => {
  test("3+2", () => {
    expect(executeSimpleExpression("3+2")).toBe(3+2);

  });
  test("3-3929+21/1/2/3/4", () => {
    expect(executeSimpleExpression("3-3929+21/1/2/3/4")).toBe(3-3929+21/1/2/3/4);

  });
  test("9+9/2*2*2/2-3+3/31/31+2131313/2", () => {
    expect(executeSimpleExpression("9+9/2*2*2/2-3+3/31/31+2131313/2")).toBe(9+9/2*2*2/2-3+3/31/31+2131313/2);

  });
});
