const mongoose = require("mongoose");
mongoose.set("bufferTimeoutMS", 30000);
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Go To Statement ",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 9,
  },
  {
    title: "Go To Statement Hahahahah",
    author: " Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1234,
  },
];

//initialize the database before every test with the beforeEach
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific note is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("Go To Statement Considered Harmful");
});

// test("blogs are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// }); //A long timeout ensures that our test won't fail due to the time it takes to run.

test("Verify id in the blog post", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("Verify the POST functionality of the blog post", async () => {
  const newBlog = {
    title: "Jumanji",
    author: "Edsger",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 909,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const blogTitles = response.body.map((blog) => blog.title);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(blogTitles).toContain("Jumanji");
});

test("Verify if like is not given, set to 0", async () => {
  const newBlogWithoutLikes = {
    title: "Jumanji 2",
    author: "Edsger",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: "",
  };
  await api
    .post("/api/blogs")
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const blogLikes = response.body.map((blog) => blog.likes);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(blogLikes).toContain(0);
});

test("Verify if the blog with no title or author throws an error", async () => {
  const newBlogWithoutTitleAndAuthor = {
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 88,
  };
  await api.post("/api/blogs").send(newBlogWithoutTitleAndAuthor).expect(400);
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("Verify the update PUT function using id", async () => {
  const response1 = await api.get("/api/blogs");
  const updateBlog = {
    ...response1.body[1],
    likes: 897,
  };
  await api
    .put(`/api/blogs/${response1.body[1].id}`)
    .send(updateBlog)
    .expect(200);
  const response2 = await api.get("/api/blogs");
  expect(response2.body[1].likes).not.toBe(response1.body[1].likes);
});

test("Verify the delete function using id", async () => {
  const response1 = await api.get("/api/blogs");
  await api.delete(`/api/blogs/${response1.body[0].id}`).expect(204);
  const response2 = await api.get("/api/blogs");
  expect(response2.body).toHaveLength(initialBlogs.length - 1);
});
//Once all the tests have finished running we have to close the database connection used by Mongoose.
afterAll(async () => {
  await mongoose.connection.close();
});
