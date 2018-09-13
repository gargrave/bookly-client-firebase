// @flow
import React from 'react'
import { array, oneOfType, string } from 'prop-types'

import styles from './ModalBody.css'

type Props = {
  message: string | string[],
}

const renderText = (message: string | string[]) => {
  if (!Array.isArray(message)) {
    message = [message]
  }
  return message.map(msg => (
    <p key={msg} className={styles.modalBodyText}>
      {msg}
    </p>
  ))
}

const ModalBody = ({ message }: Props) => {
  return <div className={styles.modalBody}>{renderText(message)}</div>
}

ModalBody.propTypes = {
  message: oneOfType([array, string]).isRequired,
}

export default ModalBody
