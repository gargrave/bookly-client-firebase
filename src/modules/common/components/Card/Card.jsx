// @flow
import React from 'react'
import { any, bool, func } from 'prop-types'
import styled from 'react-emotion'

import { buildClass } from '../../../../utils/cssHelpers'

import CardHeader from './CardHeader'
import CardSpacer from './CardSpacer'
import CardTextLine from './CardTextLine'
import CardTextList from './CardTextList'

import { colors, shadows } from '../../../../styles/'

type Props = {
  children?: any,
  hoverable?: boolean,
  onClick?: Function,
}

const Styled = styled('div')`
  ${shadows.medium};

  background-color: ${colors.cardBg};
  border: solid 1px ${colors.cardBorder};
  border-radius: 5px;
  margin: 8px auto;
  max-width: 550px;
  padding: 10px 20px;
  text-align: center;

  &.hoverable:hover {
    background: ${colors.cardHoveredBg};
    cursor: pointer;
  }
`

const Card = ({ children, hoverable = false, onClick }: Props) => {
  return (
    <Styled className={buildClass({ hoverable })} onClick={onClick}>
      {children}
    </Styled>
  )
}

Card.Header = CardHeader
Card.Spacer = CardSpacer
Card.TextLine = CardTextLine
Card.TextList = CardTextList

Card.propTypes = {
  children: any,
  hoverable: bool,
  onClick: func,
}

export default Card
