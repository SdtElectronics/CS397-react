const courseEntry = ({term, number, meets, title}) => {
  return (
    <li>{term} CS {number}: {title}</li>
  );
};

export default courseEntry;
