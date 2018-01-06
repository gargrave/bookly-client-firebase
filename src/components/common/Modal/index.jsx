// @flow
import React from 'react';
import { func, string } from 'prop-types';

import { buildClasses } from '../../../utils/cssHelpers';

import Button from '../Button';
import ButtonRow from '../ButtonRow';

import './styles.css';

type Props = {
  confirmText?: string,
  message: string,
  onCancel: Function,
  onConfirm: Function,
};

function Modal({
  confirmText,
  message,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className={buildClasses(['modal'])}>
      <div className={buildClasses(['modal__body'])}>

        <div className={buildClasses(['modal__message'])}>
          {message}
        </div>

        <hr/>
        <div className={buildClasses(['modal__button-row'])}>
          <ButtonRow>
            <Button
              onClick={onConfirm}
              position="right"
              text={confirmText || 'Yes'}
            />
          </ButtonRow>
        </div>
      </div>

      <div
        className={buildClasses(['modal__backdrop'])}
        onClick={onCancel}
      >
      </div>
    </div>
  );
}

Modal.propTypes = {
  confirmText: string,
  message: string.isRequired,
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
};

export default Modal;
