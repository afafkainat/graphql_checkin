import { Modal as AntdModal } from 'antd';
import React from 'react';

function SideModal({ ...props }) {
  return (
    <AntdModal {...props}>
      {props.children}
    </AntdModal>
  );
}

export default SideModal;
