// @flow
import React from 'react';
import { any } from 'prop-types';

import styles from './CardList.css';

type Props = {
  children?: any,
}

const CardList = ({
  children,
}: Props) => {
  return (
    <div className={styles.cardList}>
      {children}
    </div>
  );
};

CardList.propTypes = {
  children: any,
};

export default CardList;
