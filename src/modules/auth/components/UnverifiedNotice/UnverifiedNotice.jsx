// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import { localUrls } from '../../../../globals/urls';
import Alert from '../../../common/components/Alert/Alert';

import styles from './UnverifiedNotice.css';

type Props = {
};

const UnverifiedNotice = ({}: Props) => {
  return (
    <div className={styles.unverifiedNotice}>
      <Alert
        message={'You must verify your email address before proceeding.'}
        type="warning">
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
