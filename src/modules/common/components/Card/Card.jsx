// @flow
import React from 'react';
import { any, array, bool, func, string } from 'prop-types';

import { buildClasses } from '../../../../globals/utils/cssHelpers';

import './Card.css';

type Props = {
  children?: any,
  classes?: string[],
  header?: string,
  hoverable?: boolean,
  onClick?: Function,
  text?: string,
  title?: string,
};

const renderText = (
  text?: string,
  classname: string,
) => {
  if (!text) {
    return null;
  }
  return (
    <p className={buildClasses(classname)}>
      {text}
    </p>
  );
};

const rawClassList = (
  classes: string[] = [],
  hoverable: boolean = true
) => {
  const extras = [];
  if (hoverable) {
    extras.push('card--hoverable');
  }
  return ['card', ...classes, ...extras];
};

const Card = ({
  children,
  classes,
  header,
  hoverable,
  onClick,
  text,
  title,
}: Props) => {
  return (
    <div
      className={buildClasses(rawClassList(classes, hoverable))}
      onClick={onClick}
    >
      {renderText(header, 'card__header')}
      {renderText(title, 'card__title')}
      {renderText(text, 'card__text')}
      {children}
    </div>
  );
};

Card.propTypes = {
  children: any,
  classes: array,
  header: string,
  hoverable: bool,
  onClick: func,
  text: string,
  title: string,
};

export default Card;
