// @flow
import React from 'react';
import { func } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

import './styles.css';

type Props = {
  onClick: Function,
};

function ModalFooter({
  onClick,
}: Props) {
  return (
    <div
      className={buildClasses(['modal__backdrop'])}
      onClick={onClick}
    >
    </div>
  );
}

ModalFooter.propTypes = {
  onClick: func,
};

export default ModalFooter;
