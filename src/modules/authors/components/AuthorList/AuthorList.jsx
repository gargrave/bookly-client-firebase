// @flow
import React from 'react'
import { array, func, string } from 'prop-types'

import type { Author } from '../../flowtypes'

import Alert from '../../../common/components/Alert/Alert'
import AuthorListDetail from '../AuthorListDetail/AuthorListDetail'

type Props = {
  authors: Author[],
  filterBy?: string,
  onAuthorClick: Function,
}

const filterAuthor = (author: Author, filterBy?: string = '') => {
  if (!filterBy) {
    return true
  }
  const name = `${author.firstName} ${author.lastName}`.toLowerCase()
  return name.includes(filterBy)
}

const authorList = (
  authors: Author[],
  onAuthorClick: Function,
  filterBy?: string,
) => {
  return (
    <div>
      {authors
        .filter((a: Author) => filterAuthor(a, filterBy))
        .map((author: Author) => (
          <AuthorListDetail
            author={author}
            key={author.id}
            onClick={onAuthorClick.bind(null, author.id)}
          />
        ))}
    </div>
  )
}

const noAuthorsMessage = () => {
  return <Alert message={'No Authors created yet!'} type={'info'} />
}

const AuthorList = ({ authors, filterBy, onAuthorClick }: Props) => {
  return authors.length
    ? authorList(authors, onAuthorClick, filterBy)
    : noAuthorsMessage()
}

AuthorList.propTypes = {
  authors: array.isRequired,
  filterBy: string,
  onAuthorClick: func.isRequired,
}

export default AuthorList
