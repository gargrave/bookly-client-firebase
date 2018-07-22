// @flow
import React from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';

import { popSnackbar } from '../../actions';

import { SlideInFromBottom } from '../../../common/components/hocs/Transitions';
import SnackbarMessage from './SnackbarMessage/SnackbarMessage';

import './Snackbar.css';

type Props = {
  queue: any[],
  popSnackbar: Function,
};

type State = {
  currentMessage: string,
  showing: boolean,
};

class Snackbar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentMessage: '',
      showing: false,
    };

    const _this: any = this;
    _this.clearMessage = _this.clearMessage.bind(_this);
    _this.beginSnackbarHide = _this.beginSnackbarHide.bind(_this);
    _this.onSnackbarExited = _this.onSnackbarExited.bind(_this);
  }

  componentWillReceiveProps(nextProps: any) {
    this.checkQueue(nextProps.queue);
  }

  checkQueue(queue: any[] = this.props.queue) {
    if (!this.state.currentMessage && queue.length) {
      const currentMessage = queue[0].message;
      this.setState({
        currentMessage,
        showing: true,
      }, () => {
        this.props.popSnackbar();
      });
    }
  }

  beginSnackbarHide() {
    this.setState({
      showing: false,
    });
  }

  onSnackbarExited() {
    this.clearMessage(this.checkQueue.bind(this));
  }

  clearMessage(cb?: Function) {
    this.setState({
      currentMessage: '',
    }, () => {
      if (cb) {
        cb();
      }
    });
  }

  render() {
    const {
      currentMessage,
      showing,
    } = this.state;

    return (
      <SlideInFromBottom
        in={showing}
        onExited={this.onSnackbarExited}
      >
        {currentMessage &&
          <SnackbarMessage
            message={currentMessage}
            onClick={this.beginSnackbarHide}
            onSnackbarDuration={this.beginSnackbarHide}
          />
        }
      </SlideInFromBottom>
    );
  }
}

Snackbar.propTypes = {
  queue: array.isRequired,
  popSnackbar: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    queue: state.snackbar.queue || [],
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  popSnackbar() {
    return dispatch(popSnackbar());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
