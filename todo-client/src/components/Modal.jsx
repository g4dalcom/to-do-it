import reactDom from 'react-dom';

const Modal = ({ children }) => {
  const el = document.getElementById('modal');

  return reactDom.createPortal(children, el);
};

export default Modal;
