// @flow
import React from 'react';
import { func, number, string } from 'prop-types';

import { buildClasses } from '../../../../../utils/cssHelpers';

import { calculateDuration } from './helpers';

type Props = {
  duration?: number,
  message: string,
  onClick?: Function,
  onSnackbarDuration: Function,
};

let timeout;

class SnackbarMessage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const _this: any = this;
    _this.onSnackbarClick = this.onSnackbarClick.bind(this);
  }

  componentDidMount() {
    timeout = setTimeout(
      this.props.onSnackbarDuration,
      calculateDuration(this.props.duration)
    );
  }

  onSnackbarClick() {
    if (this.props.onClick) {
      if (timeout) {
        clearTimeout(timeout);
      }
      this.props.onClick();
    }
  }

  render() {
    const {
      message,
    } = this.props;

    return (
      <div
        className={buildClasses(['snackbar'])}
        onClick={this.onSnackbarClick}
      >
        <div className={buildClasses(['snackbar__message'])}>
          {message}
        </div>
      </div>
    );
  }
}

SnackbarMessage.propTypes = {
  duration: number,
  message: string.isRequired,
  onClick: func,
  onSnackbarDuration: func.isRequired,
};

export default SnackbarMessage;
