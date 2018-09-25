// @flow
import React from 'react'
import { array, object, oneOfType } from 'prop-types'
import styled from 'react-emotion'

type Props = {
  children?: any,
}

const StyledDiv = styled('div')`
  display: flex;
  justify-content: space-between;
`

const ButtonRow = ({ children }: Props) => {
  return <StyledDiv>{children}</StyledDiv>
}

ButtonRow.propTypes = {
  children: oneOfType([array, object]),
}

export default ButtonRow
