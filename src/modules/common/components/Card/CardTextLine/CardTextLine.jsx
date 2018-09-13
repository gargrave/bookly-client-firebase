// @flow
import React from 'react'
import { bool, string } from 'prop-types'

import { buildClass } from '../../../../../utils/cssHelpers'

import styles from './CardTextLine.css'

type Props = {
  bold?: boolean,
  text: string,
}

const CardTextLine = ({ bold = false, text }: Props) => {
  return (
    <p className={buildClass(styles.cardTextLine, { [styles.bold]: bold })}>
      {text}
    </p>
  )
}

CardTextLine.propTypes = {
  bold: bool,
  text: string.isRequired,
}

export default CardTextLine
