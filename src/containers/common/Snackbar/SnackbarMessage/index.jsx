// @flow
import React from 'react';
import { func, string } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

import './styles.css';

type Props = {
  message: string,
  onSnackbarEnd: Function,
};

class SnackbarMessage extends React.Component<Props> {
  componentDidMount() {
    setTimeout(this.props.onSnackbarEnd, 2500);
  }

  render() {
    const {
      message,
    } = this.props;

    return (
      <div className={buildClasses(['snackbar'])}>
        <h2>{message}</h2>
      </div>
    );
  }
}

SnackbarMessage.propTypes = {
  message: string.isRequired,
  onSnackbarEnd: func.isRequired,
};

export default SnackbarMessage;
