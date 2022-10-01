import CourseEntry from './courseEntry'

const CourseList = ({courses}) => {
  return (
    <ul>
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
