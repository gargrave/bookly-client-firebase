// @flow
import React from 'react'
import { oneOf } from 'prop-types'
import styled from 'react-emotion'

type Props = {
  size?: string,
}

const Styled = styled('div')`
  &.small {
    height: 10px;
  }

  &.medium {
    height: 20px;
  }

  &.large {
    height: 30px;
  }
`

const CardSpacer = ({ size = 'medium' }: Props) => {
  return <Styled className={size} />
}

CardSpacer.propTypes = {
  size: oneOf(['small', 'medium', 'large']),
}

export default CardSpacer
