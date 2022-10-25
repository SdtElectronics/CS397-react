import { Link } from "react-router-dom";

const courseEntry = ({cid, term, number, meets, title, active, disabled, editable, onClick}) => {
  if(active) disabled = false;
  return (
    <li className={`card m-1 p-2 border border-2 ${active ? 'border-success' : ''} ${disabled ? 'bg-secondary' : ''}`} 
        onClick={disabled ? _ => _ : onClick}>
      <div className="px-3 pt-3" style={{height: '10em'}}>
        <h4 className='font-weight-bold'>{term} CS {number}</h4>
        {title}
      </div>
      <hr className="m-2" />
      <div className="px-3 pb-3">
        <p>{meets}</p>
        {
          editable &&
          <Link to={`/edit/${cid}`} >
            <button type="button" className="btn btn-outline-dark me-2">Edit</button>
          </Link>
        }
      </div>
      
    </li>
  );
};

export default courseEntry;
