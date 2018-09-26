// @flow
import React from 'react'
import { number, string } from 'prop-types'
import styled from 'react-emotion'

type Props = {
  headerHeight: number,
  title: string,
}

const StyledTitle = styled('h3')`
  height: ${props => props.headerHeight}px;
  line-height: ${props => props.headerHeight * 0.9}px;
  padding: 5px;
`

const SexyHeaderTitle = ({ headerHeight, title }: Props) => (
  <StyledTitle headerHeight={headerHeight}>{title}</StyledTitle>
)

SexyHeaderTitle.propTypes = {
  headerHeight: number.isRequired,
  title: string.isRequired,
}

export default SexyHeaderTitle
