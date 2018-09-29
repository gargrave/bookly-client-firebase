// @flow
import React from 'react'
import { any, bool, func } from 'prop-types'

import { buildClass } from '../../../../utils/cssHelpers'

import CardHeader from './CardHeader'
import CardSpacer from './CardSpacer'
import CardTextLine from './CardTextLine'
import CardTextList from './CardTextList'

import { StyledWrapper } from './Card.styles'

type Props = {
  children?: any,
  hoverable?: boolean,
  onClick?: Function,
}

const Card = ({ children, hoverable = false, onClick }: Props) => {
  return (
    <StyledWrapper className={buildClass({ hoverable })} onClick={onClick}>
      {children}
    </StyledWrapper>
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
