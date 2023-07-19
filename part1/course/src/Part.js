import React from "react";

const Part = ({ part }) => {
  return (
    <>
      <p>{part.name}</p>
      <p>{part.exercises}</p>
    </>
  );
};

export default Part;
