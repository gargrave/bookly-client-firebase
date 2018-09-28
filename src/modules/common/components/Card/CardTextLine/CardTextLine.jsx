// @flow
import React from 'react'
import { bool, object, string } from 'prop-types'
import styled from 'react-emotion'

import { colors } from '../../../../../styles'

type Props = {
  bold?: boolean,
  style?: Object,
  text: string,
}

const Styled = styled('p')`
  color: ${colors.textLight};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  margin-bottom: 0;

  &.bold {
    font-weight: bold;
  }
`

const CardTextLine = ({ bold = false, style = {}, text }: Props) => {
  return (
    <Styled bold={bold} style={style}>
      {text}
    </Styled>
  )
}

CardTextLine.propTypes = {
  bold: bool,
  style: object,
  text: string.isRequired,
}

export default CardTextLine
