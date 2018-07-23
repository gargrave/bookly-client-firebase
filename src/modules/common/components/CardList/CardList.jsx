// @flow
import React from 'react';
import { any } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

import './CardList.css';

type Props = {
  children?: any,
}

const CardList = ({
  children,
}: Props) => {
  return (
    <div className={buildClasses(['card-list'])}>
      {children}
    </div>
  );
};

CardList.propTypes = {
  children: any,
};

export default CardList;
