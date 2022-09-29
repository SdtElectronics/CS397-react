import { useState } from 'react';
import './App.css';

const schedule = {
  title: "CS Courses for 2022-2023"
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <h1>{schedule.title}</h1>
  );
};

export default App;
