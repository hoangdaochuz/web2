import React from 'react';
import ReactDOM from 'react-dom';

import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';

function Modals({ header, isOpenModal, setClose, children, actions }) {
  function closeModal() {
    setClose();
  }

  return (
    <Modal isOpen={isOpenModal} onClose={closeModal}>
      <ModalHeader className="text-red-600">{header}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{actions}</ModalFooter>
    </Modal>
  );
}

export default Modals;
