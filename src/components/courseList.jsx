import './CourseList.css'
import CourseEntry from './courseEntry'

const CourseList = ({courses}) => {
  return (
    <ul className='course-list p-0'>
      {
        Object.entries(courses).map(([id, course]) => <CourseEntry 
          key={id}
          term={course.term} 
          number={course.number} 
          meets={course.meets} 
          title={course.title} 
        />)
      }
    </ul>
  );
};

export default CourseList;
