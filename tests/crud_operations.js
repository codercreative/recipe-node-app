const { app } = require("../app");
const { seed_db, testUserPassword } = require("../util/seed_db");
const Recipe = require("../models/Recipe");
const get_chai = require("../util/get_chai");

describe("tests for create and read operations on recipes", function () {
  before(async () => {
    const { expect, request } = await get_chai();
    this.test_user = await seed_db();

    const dataToPost = {
      email: this.test_user.email,
      password: testUserPassword,
    };
    const res = await request
      .execute(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send(dataToPost);

    const resJSONData = JSON.parse(res.text);

    this.token = resJSONData.token;
  });

  it("should get recipes list", async () => {
    const { expect, request } = await get_chai();
    const res = await request
      .execute(app)
      .get("/recipes")
      .set("Authorization", `Bearer ${this.token}`);

    expect(res).to.have.status(200);
  });
});
