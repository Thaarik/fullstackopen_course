// const listHelper = require("../utils/list_helper");

// describe("total likes", () => {
//   const listWithOneBlog = [
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//   ];
//   const listWithManyBlog = [
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f9",
//       title: "Go To Statement ",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 9,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f1",
//       title: "Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 12,
//       __v: 0,
//     },
//   ];

//   test("when list has only one blog, equals the likes of that", () => {
//     const result = listHelper.totalLikes(listWithOneBlog);
//     expect(result).toBe(5);
//   });

//   test("return the favouriteBlog having he highest likes", () => {
//     const result = listHelper.favouriteBlog(listWithManyBlog);
//     expect(result).toEqual({
//       title: "Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       likes: 12,
//     });
//   });
// });

// test("dummy returns one", () => {
//   const blogs = [];
//   const result = listHelper.dummy(blogs);
//   expect(result).toBe(1);
// });
