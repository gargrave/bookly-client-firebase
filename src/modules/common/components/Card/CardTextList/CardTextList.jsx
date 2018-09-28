// @flow
import React, { Fragment } from 'react'
import { array } from 'prop-types'
import styled from 'react-emotion'

import { colors } from '../../../../../styles/'

type CardTextListItem = {
  title?: string,
  value?: string,
}

type Props = {
  textList: CardTextListItem[],
}

const StyledItem = styled('div')`
  color: ${colors.textLight};
  margin-bottom: 0.3em;
`

const CardTextList = ({ textList }: Props) => (
  <Fragment>
    {textList.map((item, i) => (
      <StyledItem key={i}>
        {item.title && <strong>{item.title}: </strong>}
        {item.value}
      </StyledItem>
    ))}
  </Fragment>
)

CardTextList.propTypes = {
  textList: array.isRequired,
}

export default CardTextList
