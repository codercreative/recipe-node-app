const Recipe = require("../models/Recipe");
const User = require("../models/User");
const faker = require("@faker-js/faker").fakerEN_US;
const FactoryBot = require("factory-bot");
require("dotenv").config();

const testUserPassword = faker.internet.password();
const factory = FactoryBot.factory;
const factoryAdapter = new FactoryBot.MongooseAdapter();
factory.setAdapter(factoryAdapter);
factory.define("recipe", Recipe, {
  title: () => faker.lorem.words(3),
  ingredients: () => [faker.food.ingredient(), faker.food.ingredient()],
  instructions: () => [faker.lorem.sentence(), faker.lorem.sentence()],
  preparation: () => faker.number.int({ min: 5, max: 180 }),
  temp: () => faker.number.int({ min: 0, max: 250 }),
});
factory.define("user", User, {
  name: () => faker.person.fullName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
});

const seed_db = async () => {
  let testUser = null;

  try {
    const mongoURL = process.env.MONGO_URI_TEST;
    await Recipe.deleteMany({});
    await User.deleteMany({});
    testUser = await factory.create("user", { password: testUserPassword });
    await factory.createMany("recipe", 5, { createdBy: testUser._id });
  } catch (error) {
    console.log("database error");
    console.log(error.message);
    throw error;
  }
  return testUser;
};

module.exports = { testUserPassword, factory, seed_db };
