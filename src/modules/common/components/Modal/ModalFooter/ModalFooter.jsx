// @flow
import React from 'react';
import { func, string } from 'prop-types';

import { buildClasses } from '../../../../../utils/cssHelpers';

import Button from '../../Button/Button';
import ButtonRow from '../../ButtonRow/ButtonRow';

import './ModalFooter.css';

type Props = {
  cancelText?: string,
  confirmText?: string,
  onCancel: Function,
  onConfirm: Function,
};

const ModalFooter = ({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: Props) => {
  return (
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
  );
};

ModalFooter.propTypes = {
  cancelText: string,
  confirmText: string,
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
};

export default ModalFooter;
