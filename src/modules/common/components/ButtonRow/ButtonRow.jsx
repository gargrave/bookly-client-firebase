// @flow
import React from 'react'
import { array, object, oneOfType } from 'prop-types'

import styles from './ButtonRow.css'

type Props = {
  children?: any,
}

const ButtonRow = ({ children }: Props) => {
  return <div className={styles.buttonRow}>{children}</div>
}

ButtonRow.propTypes = {
  children: oneOfType([array, object]),
}

export default ButtonRow
