import './CourseList.css'
import CourseEntry from './courseEntry'

const CourseList = ({courses, selected, toggleSelected}) => {
  return (
    <ul className='course-list p-0'>
      {
        Object.entries(courses).map(([id, course]) => <CourseEntry 
          key={id}
          term={course.term} 
          number={course.number} 
          meets={course.meets} 
          title={course.title} 
          active={selected.some(e => e == id)}
          onClick={()=>toggleSelected(id)}
        />)
      }
    </ul>
  );
};

export default CourseList;
