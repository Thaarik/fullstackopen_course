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

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const updatedBlogPost = {
    ...body,
    likes: body.likes || 0,
  };
  try {
    const updateBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlogPost,
      { new: true }
    );
    response.status(200).json(updateBlog);
  } catch (error) {
    response.status(400).json({ error: error });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: error });
  }
});

module.exports = blogsRouter;
