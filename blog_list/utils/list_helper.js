const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favouriteBlog = (blogs) => {
  console.log(blogs);
  let maxLike = blogs.reduce(
    (acc, blog) => (acc < blog.likes ? (acc = blog.likes) : acc),
    0
  );
  let ans =  blogs.filter((blog) => {
    if (blog.likes === maxLike) {
      return blog;
    }
})
    return {
        title: ans[0].title,
        author: ans[0].author,
        likes: ans[0].likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
