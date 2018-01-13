// @flow
import React, { Fragment } from 'react';
import { any } from 'prop-types';
import { CSSTransition } from 'react-transition-group';

type Props = {
  children?: any,
  props?: any,
};

function SlideInFromBottom({
  children,
  ...props
}: Props) {
  return (
    <CSSTransition
      {...props}
      timeout={175}
      classNames="slide-in-up"
    >
      <Fragment>
        {children}
      </Fragment>
    </CSSTransition>
  );
}

SlideInFromBottom.propTypes = {
  children: any,
  props: any,
};

export default SlideInFromBottom;
