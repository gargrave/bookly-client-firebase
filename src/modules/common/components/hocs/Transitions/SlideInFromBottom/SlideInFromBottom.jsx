// @flow
import React, { Fragment } from 'react';
import { any, object } from 'prop-types';
import { CSSTransition } from 'react-transition-group';

type Props = {
  children?: any,
  props?: any,
  styleNames: Object,
};

const SlideInFromBottom = ({
  children,
  styleNames,
  ...props
}: Props) => {
  return (
    <CSSTransition
      {...props}
      classNames={styleNames}
      timeout={175}>
      <Fragment>
        { children }
      </Fragment>
    </CSSTransition>
  );
};

SlideInFromBottom.propTypes = {
  children: any.isRequired,
  props: any,
  styleNames: object.isRequired,
};

export default SlideInFromBottom;
