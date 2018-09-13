// @flow
import React from 'react'
import { func, number, string } from 'prop-types'

import { calculateDuration } from './helpers'

import styles from './SnackbarMessage.css'

type Props = {
  duration?: number,
  message: string,
  onClick?: Function,
  onSnackbarDuration: Function,
}

let timeout

class SnackbarMessage extends React.Component<Props> {
  static propTypes = {
    duration: number,
    message: string.isRequired,
    onClick: func,
    onSnackbarDuration: func.isRequired,
  }

  componentDidMount() {
    timeout = setTimeout(
      this.props.onSnackbarDuration,
      calculateDuration(this.props.duration),
    )
  }

  onSnackbarClick = () => {
    if (this.props.onClick) {
      if (timeout) {
        clearTimeout(timeout)
      }
      this.props.onClick()
    }
  }

  render() {
    const { message } = this.props

    return (
      <div className={styles.snackbar} onClick={this.onSnackbarClick}>
        <div className={styles.message}>{message}</div>
      </div>
    )
  }
}

export default SnackbarMessage
