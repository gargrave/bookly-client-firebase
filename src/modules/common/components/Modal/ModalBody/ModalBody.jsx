// @flow
import React from 'react';
import { array, oneOfType, string } from 'prop-types';

import { buildClasses } from '../../../../../utils/cssHelpers';

import './ModalBody.css';

type Props = {
  message: string | string[],
};

const renderText = (message: string | string[]) => {
  if (!Array.isArray(message)) {
    message = [message];
  }
  return message.map((msg) => <p key={msg}>{msg}</p>);
};

const ModalBody = ({
  message,
}: Props) => {
  return (
    <div className={buildClasses(['modal__body'])}>
      <div className={buildClasses(['modal__message'])}>
        {renderText(message)}
      </div>
    </div>
  );
};

ModalBody.propTypes = {
  message: oneOfType([array, string]).isRequired,
};

export default ModalBody;
