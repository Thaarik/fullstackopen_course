const Header = ({ course }) => {
  return <>{course}</>;
};
const Part = ({ part }) => {
  return(
    <>
    {part[0]}<br/>
    {part[1]}
  </>
  )
};
const Content = ({ part1, part2, part3 }) => {
  return (
    <>
      <Part part={part1} /><br/>
      <Part part={part2} /><br/>
      <Part part={part3} /><br/>
    </>
  );
};

const Total = ({ exercises }) => {
  return <>{exercises}</>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <br/>
      <Content
        part1={[part1, exercises1]}
        part2={[part2, exercises2]}
        part3={[part3, exercises3]}
      />
      <br/>
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
