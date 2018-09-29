// @flow
import React, { Component } from 'react'
import { array, func, object, shape } from 'prop-types'

import type { Author } from '../../../authors/flowtypes'
import type { Book, BookErrors } from '../../flowtypes'

import { localUrls } from '../../../../globals/urls'

import { bookModel } from '../../models'
import { bookHasAllFields, validateBook } from '../../validators'

import BookForm from '../../components/BookForm/BookForm'
import Card from '../../../common/components/Card/Card'
import CardList from '../../../common/components/CardList/CardList'

import styles from './BookCreatePage.css'

type Props = {
  actions: Object,
  authorActions: Object,
  authors: Author[],
  history: Object,
  preselectedAuthor: Author,
}

type State = {
  book: Book,
  errors: BookErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
}

class BookCreatePage extends Component<Props, State> {
  static propTypes = {
    actions: shape({
      createBook: func.isRequired,
      fetchBooks: func.isRequired,
    }).isRequired,
    authorActions: shape({
      clearPreselectedAuthor: func.isRequired,
      fetchAuthors: func.isRequired,
    }).isRequired,
    authors: array.isRequired,
    history: object,
    preselectedAuthor: object,
  }

  state = {
    book: bookModel.empty(),
    errors: bookModel.emptyErrors(),
    formDisabled: false,
    submitDisabled: true,
    topLevelError: '',
  }

  async componentDidMount() {
    try {
      await this.props.authorActions.fetchAuthors()
      if (this.props.preselectedAuthor) {
        this.updateAuthor(this.props.preselectedAuthor.id)
        this.props.authorActions.clearPreselectedAuthor()
      }
    } catch (err) {
      console.log('TODO: deal with this error!')
      console.log(err)
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    // ignore the update from clearing the pre-selected author, since this happens immediately upon loading
    if (this.props.preselectedAuthor && !nextProps.preselectedAuthor) {
      return false
    }
    return true
  }

  updateAuthor(authorId?: string) {
    const author = this.props.authors.find(a => a.id === authorId)

    if (author) {
      this.setState(({ book }) => {
        const updatedBook = { ...book, author }
        const submitDisabled = !bookHasAllFields(updatedBook)
        return {
          book: updatedBook,
          submitDisabled,
        }
      })
    }
  }

  onAuthorChange = (event: any) => {
    const authorId = event.target.value
    this.updateAuthor(authorId)
  }

  onInputChange = (event: any) => {
    const key = event.target.name
    const value = event.target.value

    if (key in this.state.book) {
      this.setState(({ book }) => {
        const newBook = { ...book }
        newBook[key] = value
        const submitDisabled = !bookHasAllFields(newBook)

        return {
          book: newBook,
          submitDisabled,
        }
      })
    }
  }

  onSubmit = async (event: any) => {
    event.preventDefault()
    const errors = validateBook(this.state.book)
    if (errors.found) {
      this.setState({ errors })
      return
    }

    this.setState(
      {
        errors: bookModel.emptyErrors(),
        formDisabled: true,
        topLevelError: '',
      },
      async () => {
        try {
          const book = bookModel.toAPI(this.state.book)
          await this.props.actions.createBook(book)
          this.props.history.push(localUrls.booksList)
        } catch (err) {
          this.setState({
            formDisabled: false,
            topLevelError: err,
          })
        }
      },
    )
  }

  onCancel = (event: any) => {
    event.preventDefault()
    this.props.history.push(localUrls.booksList)
  }

  render() {
    const { authors, preselectedAuthor } = this.props
    const {
      book,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state

    return (
      <div className={styles.bookCreateView}>
        <CardList>
          <Card>
            <Card.Header text="New Book" />
            <BookForm
              authors={authors}
              book={book}
              disabled={formDisabled}
              errors={errors}
              onAuthorChange={this.onAuthorChange}
              onCancel={this.onCancel}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              preselectedAuthor={preselectedAuthor}
              submitDisabled={submitDisabled}
              topLevelError={topLevelError}
            />
          </Card>
        </CardList>
      </div>
    )
  }
}

export default BookCreatePage
