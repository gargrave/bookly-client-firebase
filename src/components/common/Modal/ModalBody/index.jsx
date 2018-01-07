// @flow
import React from 'react';
import { string } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

import './styles.css';

type Props = {
  message: string,
};

function ModalBody({
  message,
}: Props) {
  return (
    <div className={buildClasses(['modal__body'])}>
      <div className={buildClasses(['modal__message'])}>
        {message}
      </div>
    </div>
  );
}

ModalBody.propTypes = {
  message: string.isRequired,
};

export default ModalBody;
