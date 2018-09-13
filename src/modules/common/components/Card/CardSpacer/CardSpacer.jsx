// @flow
import React from 'react'
import { oneOf } from 'prop-types'

import { buildClass } from '../../../../../utils/cssHelpers'

import styles from './CardSpacer.css'

type Props = {
  size?: string,
}

const CardSpacer = ({ size = 'medium' }: Props) => {
  return <div className={buildClass(styles.cardSpacer, styles[size])} />
}

CardSpacer.propTypes = {
  size: oneOf(['small', 'medium', 'large']),
}

export default CardSpacer
