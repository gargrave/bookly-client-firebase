// @flow
import React from 'react';
import { array, func, oneOfType, string } from 'prop-types';

import ModalBackdrop from './ModalBackdrop/ModalBackdrop';
import ModalBody from './ModalBody/ModalBody';
import ModalFooter from './ModalFooter/ModalFooter';
import ModalHeader from './ModalHeader/ModalHeader';

import styles from './Modal.css';

type Props = {
  cancelText?: string,
  confirmText?: string,
  message: string | string[],
  onCancel: Function,
  onConfirm: Function,
  title?: string,
};

const Modal = ({
  cancelText,
  confirmText,
  message,
  onCancel,
  onConfirm,
  title,
}: Props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <ModalHeader
          title={title} />
        <ModalBody
          message={message} />
        <ModalFooter
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={onCancel}
          onConfirm={onConfirm} />
      </div>
      <ModalBackdrop onClick={onCancel} />
    </div>
  );
};

Modal.propTypes = {
  cancelText: string,
  confirmText: string,
  message: oneOfType([array, string]).isRequired,
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
  title: string,
};

export default Modal;
