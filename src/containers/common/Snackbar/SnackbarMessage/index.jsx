// @flow
import React from 'react';
import { func, number, string } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

// clamp between MIN/MAX duration, with DEFAULT_DURATION as fallback
function calculateDuration(duration?: number): number {
  const DEFAULT_DURATION = 3250;
  const MAX_DURATION = 10000;
  const MIN_DURATION = 1000;

  return Math.max(
    MIN_DURATION,
    Math.min(
      duration || DEFAULT_DURATION,
      MAX_DURATION
    )
  );
}

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
