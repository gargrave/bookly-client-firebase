// @flow
import React from 'react';
import { func, string } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

import './styles.css';

type Props = {
  message: string,
  onSnackbarDuration: Function,
};

const DEFAULT_DURATION = 3500;

class SnackbarMessage extends React.Component<Props> {
  componentDidMount() {
    setTimeout(this.props.onSnackbarDuration, DEFAULT_DURATION);
  }

  render() {
    const {
      message,
    } = this.props;

    return (
      <div className={buildClasses(['snackbar'])}>
        <div className={buildClasses(['snackbar__message'])}>
          {message}
        </div>
      </div>
    );
  }
}

SnackbarMessage.propTypes = {
  message: string.isRequired,
  onSnackbarDuration: func.isRequired,
};

export default SnackbarMessage;
