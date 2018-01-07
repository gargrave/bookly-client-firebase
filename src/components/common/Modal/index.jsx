// @flow
import React from 'react';
import { func, string } from 'prop-types';

import { buildClasses } from '../../../utils/cssHelpers';

import Button from '../Button';
import ButtonRow from '../ButtonRow';

import './styles.css';

type Props = {
  cancelText?: string,
  confirmText?: string,
  message: string,
  onCancel: Function,
  onConfirm: Function,
  title?: string,
};

function renderHeader(title?: string) {
  if (!title) {
    return null;
  }
  return (
    <div className={buildClasses(['modal__header'])}>
      <div className={buildClasses(['modal__title'])}>
        {title}
      </div>
    </div>
  );
}

function Modal({
  cancelText,
  confirmText,
  message,
  onCancel,
  onConfirm,
  title,
}: Props) {
  return (
    <div className={buildClasses(['modal'])}>
      <div className={buildClasses(['modal__wrapper'])}>
        {renderHeader(title)}
        <div className={buildClasses(['modal__body'])}>
          <div className={buildClasses(['modal__message'])}>
            {message}
          </div>
        </div>

        <div className={buildClasses(['modal__footer'])}>
          <div className={buildClasses(['modal__button-row'])}>
            <ButtonRow>
              <Button
                onClick={onCancel}
                position="left"
                text={cancelText || 'Cancel'}
                type="secondary"
              />

              <Button
                onClick={onConfirm}
                position="right"
                text={confirmText || 'Confirm'}
              />
            </ButtonRow>
          </div>
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
  cancelText: string,
  confirmText: string,
  message: string.isRequired,
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
  title: string,
};

export default Modal;
