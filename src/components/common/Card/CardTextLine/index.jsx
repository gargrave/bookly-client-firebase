// @flow
import React from 'react';
import { bool, string } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

type Props = {
  bold?: boolean,
  condensed?: boolean,
  text: string,
};

const CardTextLine = ({
  bold = false,
  condensed = false,
  text,
}: Props) => {
  return (
    <p
      className={buildClasses([
        'card__text',
        bold ? 'card__text--bold' : '',
        condensed ? 'condensed' : '',
      ])}
    >
      {text}
    </p>
  );
};

CardTextLine.propTypes = {
  bold: bool,
  condensed: bool,
  text: string.isRequired,
};

export default CardTextLine;
