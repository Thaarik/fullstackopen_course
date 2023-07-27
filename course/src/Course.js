import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <br />
      <Content parts={course.parts} />
      <br />
      <h4>
        total of <Total parts={course.parts} /> exercises
      </h4>
    </div>
  );
};

export default Course;
