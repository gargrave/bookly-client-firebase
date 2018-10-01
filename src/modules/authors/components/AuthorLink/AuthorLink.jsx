// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import styled from 'react-emotion'

import type { Author } from '../../flowtypes'

import { localUrls } from '../../../../globals/urls'
import { colors } from '../../../../styles'

type Props = {
  author: Author,
  history?: Object,
}

const StyledLink = styled(Link)`
  color: ${colors.textMed2};
  font-size: 1.1em;
  text-decoration: underline;

  &:hover {
    color: ${colors.textMed};
  }

  &:active {
    color: ${colors.textDefault};
  }
`

const AuthorLink = ({ author }: Props) => {
  const authorId = author.id || ''
  return (
    <p>
      by&nbsp;
      <StyledLink to={`${localUrls.authorsList}/${authorId}`}>
        {author.firstName} {author.lastName}
      </StyledLink>
    </p>
  )
}

AuthorLink.propTypes = {
  author: object.isRequired,
  history: object,
}

export default AuthorLink
