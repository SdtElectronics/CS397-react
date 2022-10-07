import { useState } from "react";

import CourseList from './CourseList';

const terms = {
  Fall: "Fall",
  Winter: 'Winter',
  Spring: 'Spring'
};

const TermButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off" onChange={() => setSelection(term)} />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
      { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    {
      Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const Course = ({courseList, selection}) => {
  const selected = Object.entries(courseList).filter(e => e[1].term === selection);
  
  return (<CourseList courses={Object.fromEntries(selected)}/>);
};

const TermPage = ({courses}) => {
  const [term, setTerm] = useState('Fall');

  return (
    <div>
      <TermSelector selection={term} setSelection={setTerm} />
      <Course courseList={courses} selection={term}/>
    </div>
  );
}

export default TermPage;
