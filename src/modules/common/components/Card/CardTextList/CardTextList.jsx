// @flow
import React, { Fragment } from 'react'
import { array } from 'prop-types'

import styles from './CardTextList.css'

type CardTextListItem = {
  title?: string,
  value?: string,
}

type Props = {
  textList: CardTextListItem[],
}

const CardTextList = ({ textList }: Props) => (
  <Fragment>
    {textList.map((item, i) => (
      <p key={i} className={styles.cardTextItem}>
        {item.title && <strong>{item.title}: </strong>}
        {item.value}
      </p>
    ))}
  </Fragment>
)

CardTextList.propTypes = {
  textList: array.isRequired,
}

export default CardTextList
