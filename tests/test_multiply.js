const multiply = require("../util/multiply");
const get_chai = require("../util/get_chai");

describe("testing multiply", () => {
  it("should give 5*5 is 25", async () => {
    const { expect } = await get_chai();
    expect(multiply(5, 5)).to.equal(25);
  });
});
