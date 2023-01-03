import ReactDOM from 'react-dom'

const Modal = ({ children, top, left }) => {

  return ReactDOM.createPortal(
    <div className="modal" style={{top: top, left: left}}>
        {children}
    </div>,
    document.getElementById("portal"))
}

export default Modal
