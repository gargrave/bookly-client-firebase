// @flow
import React from 'react';
import { func } from 'prop-types';

import { buildClasses } from '../../../utils/cssHelpers';

import Button from '../Button';
import ButtonRow from '../ButtonRow';

import './styles.css';

type Props = {
  onCancel: Function,
  onConfirm: Function,
};

function Modal({
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className={buildClasses(['modal'])}>
      <div className={buildClasses(['modal__body'])}>
        OMG! This is a modal!
        <hr/>
        <div className={buildClasses(['modal__button-row'])}>
          <ButtonRow>
            <Button
              onClick={onConfirm}
              position="right"
              text="Ok"
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
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
};

export default Modal;
