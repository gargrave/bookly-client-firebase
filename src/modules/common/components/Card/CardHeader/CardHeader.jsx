// @flow
import React from 'react'
import { string } from 'prop-types'
import styled from 'react-emotion'

import { colors } from '../../../../../styles'

type Props = {
  text: string,
}

const Styled = styled('div')`
  color: ${colors.textMed};
  font-weight: bold;
  font-size: 1.4em;
`

const CardTextLine = ({ text }: Props) => {
  return <Styled>{text}</Styled>
}

CardTextLine.propTypes = {
  text: string.isRequired,
}

export default CardTextLine
