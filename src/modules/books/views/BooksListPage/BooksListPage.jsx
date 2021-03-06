// @flow
import React, { Component } from 'react'
import { array, func, object, shape } from 'prop-types'

import type { Book } from '../../flowtypes'

import { localUrls } from '../../../../globals/urls'

import BooksListVerified from '../../components/BooksListVerified/BooksListVerified'
import Button from '../../../common/components/Button'
import CardList from '../../../common/components/CardList/CardList'
import UnverifiedNotice from '../../../auth/components/UnverifiedNotice/UnverifiedNotice'

import * as S from './BooksListPage.styles'

type Props = {
  actions: Object,
  books: Book[],
  history: Object,
  user: Object,
}

type State = {
  searchValue: string,
}

class BooksListPage extends Component<Props, State> {
  static propTypes = {
    actions: shape({
      fetchBooks: func.isRequired,
    }).isRequired,
    books: array.isRequired,
    history: object,
    user: object.isRequired,
  }

  state = { searchValue: '' }

  componentDidMount() {
    this.refreshBooks()
  }

  async refreshBooks() {
    try {
      await this.props.actions.fetchBooks()
    } catch (err) {
      console.log('TODO: deal with this error!')
      console.log(err)
    }
  }

  onAddClick = () => {
    this.props.history.push(localUrls.bookCreate)
  }

  onBookClick = (bookId?: string | number) => {
    if (bookId) {
      this.props.history.push(`/books/${bookId}`)
    }
  }

  onInputChange = (event: any) => {
    const key = event.target.name
    if (key in this.state) {
      this.setState({
        searchValue: event.target.value,
      })
    }
  }

  renderAddBookButton() {
    const { user } = this.props
    if (!user || !user.emailVerified) {
      return null
    }

    return <Button onClick={this.onAddClick} text="Add" type="success" />
  }

  renderContent() {
    const { user } = this.props
    if (!user || !user.emailVerified) {
      return <UnverifiedNotice />
    }

    return (
      <BooksListVerified
        books={this.props.books}
        onBookClick={this.onBookClick}
        onInputChange={this.onInputChange}
        searchValue={this.state.searchValue}
      />
    )
  }

  render() {
    return (
      <S.BooksListPage>
        <S.Header>
          My Books
          {this.renderAddBookButton()}
        </S.Header>
        <CardList>{this.renderContent()}</CardList>
      </S.BooksListPage>
    )
  }
}

export default BooksListPage
