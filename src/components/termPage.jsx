import { useState } from "react";

import CourseList from './CourseList';
import ModalSelected from './modalSelected';

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

const Course = ({courseList, selection, toggleSelected}) => {
  return (<CourseList courses={Object.fromEntries(courseList)}
                      selected={selection}
                      toggleSelected={toggleSelected} />);
};

const TermPage = ({courses}) => {
  const [term, setTerm] = useState('Fall');
  const [openSelected, setOpenSelected] = useState(false);

  const [selected, setSelected] = useState([]);

  const toggleSelected = item => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  const filtered = Object.entries(courses).filter(e => e[1].term === term);
  const selectedObjs = Object.entries(courses).filter(e => selected.includes(e[0]));

  const openSelectedModal = () => setOpenSelected(true);
  const closeSelectedModal = () => setOpenSelected(false);

  return (
    <div>
      <div className="d-flex">
        <TermSelector selection={term} setSelection={setTerm} />
        <button type="button" className="ms-auto btn btn-success m-1 p-2" onClick={openSelectedModal}>
          course plan
        </button>
      </div>
      <Course courseList={filtered} selection={selected} toggleSelected={toggleSelected}/>
      <ModalSelected selection={selectedObjs} open={openSelected} close={closeSelectedModal}/>
    </div>
  );
}

export default TermPage;
