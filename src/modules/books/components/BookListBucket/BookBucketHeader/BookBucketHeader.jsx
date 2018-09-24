// @flow
import React from 'react'
import { array, shape, string } from 'prop-types'
import styled from 'react-emotion'

import type { BookBucket } from '../../../flowtypes'

type Props = {
  bucket: BookBucket,
}

const Styled = styled('div')`
  color: #777;
  font-size: 1.4rem;
  margin-bottom: 2px;
  text-align: left;

  @media only screen and (max-width: 639px) {
    font-size: 1.2rem;
  }
`

const BookBucketHeader = ({ bucket }: Props) => {
  return <Styled>{bucket.author}</Styled>
}

BookBucketHeader.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
}

export default BookBucketHeader
