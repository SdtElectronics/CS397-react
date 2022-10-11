import Modal from './Modal';

const ModalSelected = ({selection, open, close}) => (
  <Modal open={open} close={close}>
    {
      selection.length > 0 ?
      (<ul className='p-0'>
        {
          selection.map(([id, course]) => <li className="card m-2 p-2 text-center border">
            <b className="p-1">{course.number} {course.title}</b>
            {course.meets}
          </li>)
        }
      </ul>) :
      <p>No class was selected. Click on the class to select one</p>
    }
  </Modal>
);

export default ModalSelected;
