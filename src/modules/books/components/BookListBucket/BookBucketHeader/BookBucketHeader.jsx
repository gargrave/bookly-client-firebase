// @flow
import React from 'react'
import { array, bool, func, shape, string } from 'prop-types'
import styled from 'react-emotion'

import type { BookBucket } from '../../../flowtypes'

type Props = {
  bucket: BookBucket,
  expanded: boolean,
  onToggleExpanded: (event: any) => void,
}

export const StyledWrapper = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-left: 4px;
  padding-right: 4px;
`

export const StyledAuthorName = styled('span')`
  color: #777;
  font-size: 1.4rem;
  margin-bottom: 2px;
  text-align: left;

  @media only screen and (max-width: 639px) {
    font-size: 1.2rem;
  }
`

export const StyledBookCount = styled('span')`
  font-size: 1rem;
  margin-left: 4px;
`

export const StyledToggle = styled('span')`
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 8px;
`

const BookBucketHeader = ({ bucket, expanded, onToggleExpanded }: Props) => {
  return (
    <StyledWrapper>
      <StyledAuthorName>
        {bucket.author}
        <StyledBookCount>{`(${bucket.books.length})`}</StyledBookCount>
      </StyledAuthorName>
      <StyledToggle onClick={onToggleExpanded}>
        {expanded ? 'collapse' : 'expand'}
      </StyledToggle>
    </StyledWrapper>
  )
}

BookBucketHeader.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
  expanded: bool.isRequired,
  onToggleExpanded: func.isRequired,
}

export default BookBucketHeader
