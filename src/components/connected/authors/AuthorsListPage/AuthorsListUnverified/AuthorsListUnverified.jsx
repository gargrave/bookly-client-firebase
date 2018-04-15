// @flow
import React, { Fragment } from 'react';

import Alert from '../../../../common/Alert/Alert';

type Props = {
};

const AuthorsListUnverified = ({}: Props) => {
  return (
    <Fragment>
      <Alert
        message={'You must verify your email address before proceeding.'}
        type="warning"
      />
    </Fragment>
  );
};

AuthorsListUnverified.propTypes = {
};

export default AuthorsListUnverified;
