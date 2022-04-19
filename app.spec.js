const { test, expect } = require("@jest/globals");
const app = require("./app");

const testData = "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00"

test("return value should not be null", () => {
    console.log("🚨 checking if return value is null");
  expect(app.calcPay(testData)).not.toBeNull;
});
test("return type should be of type string", () => {
  console.log("🔤 checking if return value is of type 'string'")
  expect(typeof (app.calcPay(testData))).toBe("string"); 
});

test( "should be able to calculate payroll from sample input and return in the appropriate format", ()=>{
    console.log("📟 checking if function calculates correctly and return in the appropriate format");
  expect(app.calcPay(testData)).toBe(`The amount to pay ASTRID is: 85 USD`);
});
