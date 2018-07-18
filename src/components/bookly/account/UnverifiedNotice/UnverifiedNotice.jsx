// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import { localUrls } from '../../../../globals/urls';
import { buildClasses } from '../../../../globals/utils/cssHelpers';

import Alert from '../../../../modules/common/components/Alert/Alert';

import './UnverifiedNotice.css';

type Props = {
};

const UnverifiedNotice = ({}: Props) => {
  return (
    <div className={buildClasses(['unverified-notice'])}>
      <Alert
        className='fart'
        message={'You must verify your email address before proceeding.'}
        type="warning"
      >
        <p>
          You can request a new verification link from
          your <Link to={localUrls.account}>Account Page</Link>.
        </p>
      </Alert>
    </div>
  );
};

UnverifiedNotice.propTypes = {
};

export default UnverifiedNotice;
