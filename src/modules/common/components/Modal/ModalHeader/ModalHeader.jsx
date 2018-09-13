// @flow
import React from 'react'
import { string } from 'prop-types'

import styles from './ModalHeader.css'

type Props = {
  title?: string,
}

const ModalFooter = ({ title }: Props) => {
  return (
    <div className={styles.modalHeader}>
      <div className={styles.modalTitle}>{title || 'Confirm'}</div>
    </div>
  )
}

ModalFooter.propTypes = {
  title: string,
}

export default ModalFooter
