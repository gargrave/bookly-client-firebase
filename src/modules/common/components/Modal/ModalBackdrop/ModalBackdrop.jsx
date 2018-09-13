// @flow
import React from 'react'
import { func } from 'prop-types'

import styles from './ModalBackdrop.css'

type Props = {
  onClick: Function,
}

const ModalFooter = ({ onClick }: Props) => {
  return <div className={styles.modalBackdrop} onClick={onClick} />
}

ModalFooter.propTypes = {
  onClick: func,
}

export default ModalFooter
