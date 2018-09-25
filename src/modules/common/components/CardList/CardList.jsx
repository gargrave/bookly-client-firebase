// @flow
import React from 'react'
import { any } from 'prop-types'
import styled from 'react-emotion'

type Props = {
  children?: any,
}

const StyledDiv = styled('div')`
  margin: auto;
  max-width: 550px;
  padding: 0 10px;
`

const CardList = ({ children }: Props) => {
  return <StyledDiv className="cardList">{children}</StyledDiv>
}

CardList.propTypes = {
  children: any,
}

export default CardList
