// @flow
import React from 'react'
import { func, object } from 'prop-types'
import styled from 'react-emotion'

import type { BookBucket } from '../../flowtypes'

import BookBucketBookList from './BookBucketBookList/BookBucketBookList'
import BookBucketHeader from './BookBucketHeader/BookBucketHeader'

const Styled = styled('div')`
  & + & {
    margin-top: 25px;
  }

  @media only screen and (max-width: 639px) {
    & + & {
      margin-top: 35px;
    }
  }
`
type Props = {
  bucket: BookBucket,
  onBookClick: (bookId?: string | number) => void,
}

type State = {
  expanded: boolean,
}

export default class BookListBucket extends React.Component<Props, State> {
  static propTypes = {
    bucket: object.isRequired,
    onBookClick: func.isRequired,
  }

  state = {
    expanded: true,
  }

  handleToggleExpanded = () => {
    this.setState(({ expanded }) => ({
      expanded: !expanded,
    }))
  }

  render() {
    const { bucket, onBookClick } = this.props
    const { expanded } = this.state

    return (
      <Styled>
        <BookBucketHeader
          bucket={bucket}
          expanded={expanded}
          onToggleExpanded={this.handleToggleExpanded}
        />
        {expanded && (
          <BookBucketBookList bucket={bucket} onBookClick={onBookClick} />
        )}
      </Styled>
    )
  }
}
