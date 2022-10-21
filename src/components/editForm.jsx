import { useParams, useNavigate } from "react-router-dom";
import { useFormData } from '../utilities/useFormData';
import { useDbUpdate } from '../utilities/firebase';

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className={`form-control ${state.errors ? "is-invalid" : ""}`} id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const validateTitle = (key, val) => /(^\w\w)/.test(val) ? '' : 'Title must be at least two characters';

const validateMeets = (key, val) => 
/^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/.test(val) ? '' : 'Meets must contain days and start-end, e.g., MWF 12:00-13:20';

const EditForm = ({ courses }) => {
  const { id } = useParams();
  const [titleState, titleChange] = useFormData(validateTitle, courses[id]);
  const [meetsState, meetsChange] = useFormData(validateMeets, courses[id]);
  const [update, result] = useDbUpdate(`/courses/${id}`)

  const submit = evt => {
    evt.preventDefault();
    if (!titleState.errors && !meetsState.errors) {
      update({
        "title": titleState.values.title,
        "meets": meetsState.values.meets
      });
    }
  };

  return (
      <div className="container pt-3">
          <h2>Edit Course Information</h2>
          <form onSubmit={submit}>
              <InputField name="title" text="Title" state={titleState} change={titleChange} />
              <InputField name="meets" text="Meets" state={meetsState} change={meetsChange} />
              <ButtonBar disabled={titleState.errors || meetsState.errors}/>
          </form>
      </div>
  )
}

export default EditForm;
