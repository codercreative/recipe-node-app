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

  it("should create a recipe", async () => {
    const { expect, request } = await get_chai();

    const dataToPost = {
      title: "Chocolate Cake",
      ingredients: ["chocolate", "flour", "eggs", "sugar"],
      instructions: ["mix it all together and back"],
      preparation: 60,
      temp: 250,
    };

    const res = await request
      .execute(app)
      .post("/recipes")
      .set("Authorization", `Bearer ${this.token}`)
      .send(dataToPost);

    const recipe = await Recipe.findOne({ title: "Chocolate Cake" });
    expect(recipe).to.not.be.null;
    expect(res).to.have.status(201);
  });
});
