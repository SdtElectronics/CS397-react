const courseEntry = ({term, number, meets, title}) => {
  return (
    <li className="card m-1 p-2 border border-2">
      <div className="px-3 pt-3" style={{height: '10em'}}>
        <h4 className='font-weight-bold'>{term} CS {number}</h4>
        {title}
      </div>
      <hr className="m-2" />
      <div className="px-3 pb-3">{meets}</div>
    </li>
  );
};

export default courseEntry;
