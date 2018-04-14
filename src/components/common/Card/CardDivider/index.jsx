// @flow
import React from 'react';

import { buildClasses } from '../../../../globals/utils/cssHelpers';

type Props = {
};

const CardDivider = ({}: Props) => {
  return (
    <hr className={buildClasses(['card__divider'])} />
  );
};

CardDivider.propTypes = {
};

export default CardDivider;
