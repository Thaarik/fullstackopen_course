const mongoose = require("mongoose");
mongoose.set("bufferTimeoutMS", 30000);
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)
console.log(response.body)
}); //A long timeout ensures that our test won't fail due to the time it takes to run.

//Once all the tests have finished running we have to close the database connection used by Mongoose.
afterAll(async () => {
  await mongoose.connection.close();
});
