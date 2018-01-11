// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';

import { snackbarPop } from '../../../store/actions/snackbarActions';

import SnackbarMessage from './SnackbarMessage/';

type Props = {
  queue: any[],
  snackbarPop: Function,
};

type State = {
  currentMessage: string,
};

class Snackbar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentMessage: '',
    };

    const _this: any = this;
    _this.onSnackbarEnd = _this.onSnackbarEnd.bind(_this);
  }

  componentWillReceiveProps(nextProps: any) {
    this.checkQueue(nextProps.queue);
  }

  checkQueue(queue: any[] = this.props.queue) {
    if (!this.state.currentMessage && queue.length) {
      const currentMessage = queue[0].message;
      this.setState({
        currentMessage,
      }, () => {
        this.props.snackbarPop();
      });
    }
  }

  onSnackbarEnd() {
    this.setState({
      currentMessage: '',
    }, () => {
      this.checkQueue();
    });
  }

  render() {
    const {
      currentMessage,
    } = this.state;

    return (
      <Fragment>
        {currentMessage &&
          <SnackbarMessage
            message={currentMessage}
            onSnackbarEnd={this.onSnackbarEnd}
          />
        }
      </Fragment>
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
