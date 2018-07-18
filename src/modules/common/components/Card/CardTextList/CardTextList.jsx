// @flow
import React, { Fragment } from 'react';
import { array } from 'prop-types';

import { buildClasses } from '../../../../../globals/utils/cssHelpers';

type CardTextListItem = {
  title?: string,
  value?: string,
}

type Props = {
  textList: CardTextListItem[],
};

const CardTextList = ({
  textList,
}: Props) => {
  return (
    <Fragment>
      {
        textList.map((item, i) => {
          return (
            <p key={i} className={buildClasses('card__text')}>
              {item.title && <strong>{item.title}: </strong>}
              {item.value}
            </p>
          );
        })
      }
    </Fragment>
  );
};

CardTextList.propTypes = {
  textList: array.isRequired,
};

export default CardTextList;
