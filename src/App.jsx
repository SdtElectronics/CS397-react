import { useState } from 'react';
import Banner from './components/banner';
import './App.css';

const schedule = {
  title: "CS Courses for 2022-2023"
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Banner title={schedule.title} />
  );
};

export default App;
