import { useParams, useNavigate } from "react-router-dom";
import { useFormData } from '../utilities/useFormData';

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" hidden disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const EditForm = ({ courses }) => {
  const { id } = useParams();
  const [state, change] = useFormData(courses[id]);

  return (
      <div className="container pt-3">
          <h2>Edit Course Information</h2>
          <form>
              <InputField name="title" text="Title" state={state} change={change} />
              <InputField name="meets" text="Meets" state={state} change={change} />
              <ButtonBar />
          </form>
      </div>
  )
}

export default EditForm;
