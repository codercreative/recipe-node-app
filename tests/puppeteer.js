process.env.NODE_ENV = "test";
require("dotenv").config();

const puppeteer = require("puppeteer");
const { seed_db, testUserPassword } = require("../util/seed_db");
const { app } = require("../app");
const Recipe = require("../models/Recipe");

let testUser = null;
let page = null;
let browser = null;
// Launch the browser and open a new blank page
describe("recipes-jwt puppeteer test", function () {
  before(async function () {
    this.timeout(20000);

    // await connectDB(process.env.MONGO_URI_TEST);
    // console.log("✅Connected DB:", mongoose.connection.name);

    testUser = await seed_db();

    // launch puppeteer
    // browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      defaultViewport: { width: 1280, height: 1800 },
    });

    page = await browser.newPage();
    await page.goto("http://localhost:3000");
  });
  after(async function () {
    this.timeout(5000);
    if (browser) await browser.close();
  });
  describe("got to site", function () {
    it("should have completed a connection", async function () {});
  });
  describe("index page test", function () {
    this.timeout(10000);
    it("finds the index page logon link", async () => {
      this.logonLink = await page.waitForSelector(
        'a.nav-btn[href="login.html"]'
      );
    });
    it("gets to the logon page", async () => {
      await this.logonLink.click();
      await page.waitForNavigation();
      const email = await page.waitForSelector('input[name="email"]');
    });
  });
  describe("logon page test", function () {
    this.timeout(20000);
    it("resolves all the fields", async () => {
      this.email = await page.waitForSelector('input[name="email"]');
      this.password = await page.waitForSelector('input[name="password"]');
      this.submit = await page.waitForSelector('button.btn[type="submit"]');
    });
    it("sends the logon", async () => {
      await this.email.type(testUser.email);
      await this.password.type(testUserPassword);
      await this.submit.click();
      await page.waitForNavigation();
      await page.waitForSelector("#logoff-btn", { timeout: 5000 }); //indicates we are in the recipes page
    });
  });
  describe("saved recipes test", function () {
    this.timeout(20000);
    it("verifies the number of saved recipes", async () => {
      const { expect } = await import("chai");
      await page.waitForSelector("article.recipe-article");
      const recipeHTMLPage = await page.content();
      expect(recipeHTMLPage.split("recipe-article").length).to.equal(6);
    });
  });
  describe("add a recipe test", function () {
    this.timeout(20000);
    it("it adds a recipe to saved recipes", async () => {
      const { expect } = await import("chai");
      this.title = await page.waitForSelector('input[name="title"]');
      this.ingredients = await page.waitForSelector(
        'textarea[name="ingredients"]'
      );
      this.instructions = await page.waitForSelector(
        'textarea[name="instructions"]'
      );
      this.preparation = await page.waitForSelector(
        'input[name="preparation"]'
      );
      this.temp = await page.waitForSelector('input[name="temp"]');
      this.submit = await page.waitForSelector('button.btn[type="submit"]');
      // entering a test recipe:
      await this.title.type("Apple Pie");
      await this.ingredients.type("apples\neggs\nflour");
      await this.instructions.type("mix all the ingredients together");
      await this.preparation.type("30");
      await this.temp.type("350");
      await this.submit.click();
      await page.waitForSelector("#toast-notification.toast-visible");
      const addedRecipe = await Recipe.findOne({ title: "Apple Pie" });
      expect(addedRecipe).not.to.be.null;
    });
  });
  describe("logoff page test", function () {
    this.timeout(20000);
    it("logs off the user and returns to home page", async () => {
      this.logOffLink = await page.waitForSelector("#logoff-btn");
      await this.logOffLink.click();
      await page.waitForNavigation({ timeout: 5000 });
      await page.waitForSelector('a.nav-btn[href="login.html"]');
    });
  });
});
