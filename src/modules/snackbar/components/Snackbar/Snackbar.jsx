// @flow
import React from 'react';
import { array, func, shape } from 'prop-types';

import { SlideInFromBottom } from '../../../common/components/hocs/Transitions';
import SnackbarMessage from '../../components/SnackbarMessage/SnackbarMessage';

import styles from '../SnackbarMessage/SnackbarMessage.css';

type Props = {
  actions: Object,
  popSnackbar: Function,
  queue: any[],
};

type State = {
  currentMessage: string,
  showing: boolean,
};

const styleNames={
  enter: styles['slideInUp-enter'],
  enterActive: styles['slideInUp-enter-active'],
  exit: styles['slideInUp-exit'],
  exitActive: styles['slideInUp-exit-active'],
};

class Snackbar extends React.Component<Props, State> {
  static propTypes = {
    actions: shape({
      popSnackbar: func.isRequired,
    }).isRequired,
    queue: array.isRequired,
  }

  constructor(props: any) {
    super(props);

    this.state = {
      currentMessage: '',
      showing: false,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    this.checkQueue(nextProps.queue);
  }

  checkQueue = (queue: any[] = this.props.queue) => {
    if (!this.state.currentMessage && queue.length) {
      const currentMessage = queue[0].message;
      this.setState({
        currentMessage,
        showing: true,
      }, this.props.actions.popSnackbar);
    }
  }

  beginSnackbarHide = () => {
    this.setState({
      showing: false,
    });
  }

  onSnackbarExited = () => {
    this.clearMessage(this.checkQueue);
  }

  clearMessage = (onClear?: Function) => {
    this.setState({
      currentMessage: '',
    }, () => {
      if (onClear) {
        onClear();
      }
    });
  }

  render() {
    const { currentMessage, showing } = this.state;
    return (
      <SlideInFromBottom
        in={showing}
        onExited={this.onSnackbarExited}
        styleNames={styleNames}>
        { currentMessage &&
          <SnackbarMessage
            message={currentMessage}
            onClick={this.beginSnackbarHide}
            onSnackbarDuration={this.beginSnackbarHide} />
        }
      </SlideInFromBottom>
    );
  }
}

export default Snackbar;
