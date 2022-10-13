import './CourseList.css'
import CourseEntry from './courseEntry'
import { isMeetConflict } from '../utilities/validateTime';

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
          active={selected.includes(id)}
          disabled={
            course.meets.length > 0 && 
            selected.some(
              e => courses[e] && 
              courses[e].meets.length > 0 && 
              isMeetConflict(courses[e].meets, course.meets)
            )
          }
          onClick={()=>toggleSelected(id)}
        />)
      }
    </ul>
  );
};

export default CourseList;
