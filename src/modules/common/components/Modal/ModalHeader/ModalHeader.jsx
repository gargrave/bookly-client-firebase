// @flow
import React from 'react';
import { string } from 'prop-types';

import { buildClasses } from '../../../../../utils/cssHelpers';

import './ModalHeader.css';

type Props = {
  title?: string,
};

const ModalFooter = ({
  title,
}: Props) => {
  return (
    <div className={buildClasses(['modal__header'])}>
      <div className={buildClasses(['modal__title'])}>
        {title || 'Confirm'}
      </div>
    </div>
  );
};

ModalFooter.propTypes = {
  title: string,
};

export default ModalFooter;
