//Note: Adjusted original code from Code the Dream to align with my JWT full stack recipe app. Replaced CSRF/session logic.

const { app } = require("../app");
const { factory, seed_db } = require("../util/seed_db");
const faker = require("@faker-js/faker").fakerEN_US;
const get_chai = require("../util/get_chai");

const User = require("../models/User");

describe("tests for registration and logon", function () {
  it("should register the user", async () => {
    const { expect, request } = await get_chai();
    this.password = faker.internet.password();
    this.user = await factory.build("user", { password: this.password });

    const dataToPost = {
      name: this.user.name,
      email: this.user.email,
      password: this.password,
    };
    const req = await request
      .execute(app)
      // auth not session here:
      .post("/auth/register")
      .set("content-type", "application/json")
      .send(dataToPost);
    const res = await req;

    const resJSONData = JSON.parse(res.text);
    // 201 status created
    expect(res).to.have.status(201);
    expect(resJSONData).to.have.property("token");
    expect(resJSONData).to.have.property("user");
    const newUser = await User.findOne({ email: this.user.email });
    expect(newUser).to.not.be.null;
  });

  it("should log the user on", async () => {
    const { expect, request } = await get_chai();

    const dataToPost = {
      email: this.user.email,
      password: this.password,
    };

    const req = await request
      .execute(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send(dataToPost);
    const res = await req;
    const resJSONData = JSON.parse(res.text);
    // 200 status ok:
    expect(res).to.have.status(200);
    expect(resJSONData).to.have.property("token");
    expect(resJSONData).to.have.property("user");
  });

  it("should block access to protected routes without a token", async () => {
    const { expect, request } = await get_chai();
    const req = await request.execute(app).get("/recipes");

    const res = await req;
    expect(res).to.have.status(401);
  });
});
