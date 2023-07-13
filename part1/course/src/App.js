const Header = ({ course }) => {
  return <h2>{course}</h2>;
};
const Part = ({ part }) => {
  return(
    <>
    <p>{part.name}</p>
    <p>{part.exercises}</p>
  </>
  )
};
const Content = ({ parts}) => {
  return (
    <>
      {parts.map((part)=>(<Part part={part} />))}
    </>
  );
};

const Total = ({ parts }) => {
  const sumTotal = (parts)=>{
    let sum=0
    parts.forEach((part)=>{
      sum=sum+part['exercises']
    })
    return sum
  }
  return (<>
    <p>{sumTotal(parts)}</p>
  </>)
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <br/>
      <Content parts={course.parts} />
      <br/>
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
