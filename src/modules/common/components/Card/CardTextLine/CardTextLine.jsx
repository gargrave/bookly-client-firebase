// @flow
import React from 'react'
import { bool, string } from 'prop-types'

import { buildClass } from '../../../../../utils/cssHelpers'

import styles from './CardTextLine.css'

type Props = {
  bold?: boolean,
  style?: Object,
  text: string,
}

const CardTextLine = ({ bold = false, style = {}, text }: Props) => {
  return (
    <p
      className={buildClass(styles.cardTextLine, { [styles.bold]: bold })}
      style={style}
    >
      {text}
    </p>
  )
}

CardTextLine.propTypes = {
  bold: bool,
  text: string.isRequired,
}

export default CardTextLine
