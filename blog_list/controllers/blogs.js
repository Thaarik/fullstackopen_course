const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const blogPost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  try {
    const postedBlog = await blogPost.save();
    response.status(201).json(postedBlog);
  } catch (error) {
    response.status(400).json({ error: error });
  }
});

module.exports = blogsRouter;
