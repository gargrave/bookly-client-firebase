// @flow
import React from 'react';
import { array, func, oneOfType, string } from 'prop-types';

import { buildClasses } from '../../../globals/utils/cssHelpers';

import ModalBackdrop from './ModalBackdrop';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

import './styles.css';

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
    <div className={buildClasses(['modal'])}>
      <div className={buildClasses(['modal__wrapper'])}>
        <ModalHeader
          title={title}
        />
        <ModalBody
          message={message}
        />
        <ModalFooter
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
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
