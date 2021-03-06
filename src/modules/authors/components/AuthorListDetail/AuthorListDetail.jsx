// @flow
import React from 'react'
import { func, number, shape, string } from 'prop-types'

import type { Author } from '../../flowtypes'

import Card from '../../../common/components/Card/Card'

type Props = {
  author: Author,
  onClick: Function,
}

const bookCountString = (count?: number = 0): string => {
  const pluralizer = count === 1 ? '' : 's'
  return `${count} book${pluralizer}`
}

const AuthorListDetail = ({ author, onClick }: Props) => {
  const authorName = `${author.firstName} ${author.lastName}`
  return (
    <Card hoverable={true} onClick={onClick}>
      <Card.TextLine text={authorName} type="title" />
      <Card.TextLine text={bookCountString(author.bookCount)} type="subtext" />
    </Card>
  )
}

AuthorListDetail.propTypes = {
  author: shape({
    bookCount: number.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
  }),
  onClick: func.isRequired,
}

export default AuthorListDetail
