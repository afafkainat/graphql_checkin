import { Modal as AntdModal } from "antd";


const Modal = ({ ...props }) => {

  return (
    <AntdModal {...props}>
    {props.children}
    </AntdModal>
  );
};

export default Modal;
