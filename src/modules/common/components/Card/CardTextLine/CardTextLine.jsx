// @flow
import React from 'react'
import { oneOf, string } from 'prop-types'
import styled from 'react-emotion'

import { colors } from '../../../../../styles'

type Props = {
  text: string,
  type?: string,
}

const validTypes = ['header', 'subtext', 'text', 'title']

const Styled = styled('div')`
  color: ${colors.textLight};
  margin-bottom: 0;

  &.bold,
  &.title {
    color: ${colors.textMed};
    font-weight: bold;
  }

  &.subtext {
    color: ${colors.textMedLight};
    font-size: 0.9em;
  }
`

const CardTextLine = ({ text, type = 'text' }: Props) => {
  return <Styled className={type || null}>{text}</Styled>
}

CardTextLine.propTypes = {
  text: string.isRequired,
  type: oneOf(validTypes),
}

export default CardTextLine
