// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { snackbarPop } from '../../../store/actions/snackbarActions';

import SnackbarMessage from './SnackbarMessage/';

type Props = {
  queue: any[],
  snackbarPop: Function,
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
        this.props.snackbarPop();
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
      <CSSTransition
        in={showing}
        timeout={1000}
        classNames="slide-up"
        onExited={this.onSnackbarExited}
      >
        <Fragment>
          {currentMessage &&
            <SnackbarMessage
              message={currentMessage}
              onClick={this.beginSnackbarHide}
              onSnackbarDuration={this.beginSnackbarHide}
            />
          }
        </Fragment>
      </CSSTransition>
    );
  }
}

Snackbar.propTypes = {
  queue: array.isRequired,
  snackbarPop: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    queue: state.snackbar.queue || [],
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  snackbarPop() {
    return dispatch(snackbarPop());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
