import React from "react";

const Total = ({ parts }) => {
  const sumTotal = (parts) => {
    let initial = 0;
    let exerciseArray = [];
    parts.forEach((part) => exerciseArray.push(part.exercises));
    const sumwithInitial = exerciseArray.reduce(
      (acc, curr) => acc + curr,
      initial
    );
    return sumwithInitial;
  };
  return (
    <>
      <span>{sumTotal(parts)}</span>
    </>
  );
};
export default Total;
