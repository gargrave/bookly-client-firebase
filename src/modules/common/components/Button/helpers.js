// @flow
import { buildClasses } from '../../../../globals/utils/cssHelpers';

import {
  POSITIONS,
  TYPES,
} from './constants';

const buttonClass = (type: string) => {
  if (TYPES.includes(type)) {
    return `button-${type}`;
  }
  return '';
};

const positionClass = (position: string) => {
  if (POSITIONS.includes(position)) {
    return `button--${position}`;
  }
  return '';
};

export const buildClassList = (
  type: string,
  position: string,
  classes: string,
) => {
  return buildClasses(
    ['button', positionClass(position)],
    [buttonClass(type), ...classes.split(' ')],
  );
};
