// @flow
import React from 'react'
import { any, array, bool, func, string } from 'prop-types'

import CardSpacer from './CardSpacer/CardSpacer'
import CardTextLine from './CardTextLine/CardTextLine'
import CardTextList from './CardTextList/CardTextList'

import styles from './Card.css'

type Props = {
  children?: any,
  classes?: string[],
  header?: string,
  hoverable?: boolean,
  onClick?: Function,
  text?: string,
  title?: string,
}

const renderText = (text?: string, classname: string) => {
  if (!text) {
    return null
  }
  return <p className={classname}>{text}</p>
}

const classList = (classes: string[] = [], hoverable: boolean = true) => {
  const extras = []
  if (hoverable) {
    extras.push(styles.hoverableCard)
  }
  return [styles.card, ...classes, ...extras].join(' ')
}

const Card = ({
  children,
  classes,
  header,
  hoverable = false,
  onClick,
  text,
  title,
}: Props) => {
  return (
    <div className={classList(classes, hoverable)} onClick={onClick}>
      {renderText(header, styles.header)}
      {renderText(title, styles.title)}
      {renderText(text, styles.text)}
      {children}
    </div>
  )
}

Card.Spacer = CardSpacer
Card.TextLine = CardTextLine
Card.TextList = CardTextList

Card.propTypes = {
  children: any,
  classes: array,
  header: string,
  hoverable: bool,
  onClick: func,
  text: string,
  title: string,
}

export default Card
