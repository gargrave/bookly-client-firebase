// @flow
import React, { Component } from 'react'
import { array, func, object, shape, string } from 'prop-types'

import type { Author } from '../../../authors/flowtypes'
import type { Book, BookErrors } from '../../flowtypes'

import { localUrls } from '../../../../globals/urls'

import { bookModel } from '../../models'
import { bookHasAllFields, booksMatch, validateBook } from '../../validators'

import Alert from '../../../common/components/Alert/Alert'
import BookDetailView from '../../components/BookDetailView/BookDetailView'
import BookEditView from '../../components/BookEditView/BookEditView'
import CardList from '../../../common/components/CardList/CardList'
import Modal from '../../../common/components/Modal/Modal'

type Props = {
  actions: Object,
  authors: Author[],
  book: Book,
  bookId: string,
  history: Object,
  snackbarActions: Object,
}

type State = {
  deleteDialogShowing: boolean,
  editableBook: Book,
  editing: boolean,
  errors: BookErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
}

class BookDetailPage extends Component<Props, State> {
  static propTypes = {
    actions: shape({
      deleteBook: func.isRequired,
      fetchBooks: func.isRequired,
      updateBook: func.isRequired,
    }).isRequired,
    authors: array.isRequired,
    book: shape({
      author: object,
      title: string,
    }).isRequired,
    bookId: string,
    history: object,
    snackbarActions: shape({
      createSnackbar: func.isRequired,
    }),
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      deleteDialogShowing: false,
      editableBook: bookModel.empty(),
      editing: false,
      errors: bookModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: false,
      topLevelError: '',
    }
  }

  componentDidMount() {
    this.refreshBooks()
  }

  async refreshBooks() {
    try {
      await this.props.actions.fetchBooks()
      this.setState({
        formDisabled: false,
      })
    } catch (err) {
      this.setState({
        formDisabled: false,
        topLevelError: err,
      })
    }
  }

  onAuthorChange = (event: any) => {
    const authorId = event.target.value
    const author = this.props.authors.find(a => a.id === authorId)
    const editableBook = {
      ...this.state.editableBook,
      author,
    }
    const submitDisabled =
      !bookHasAllFields(editableBook) ||
      booksMatch(this.props.book, editableBook)

    if (author) {
      this.setState({
        editableBook,
        submitDisabled,
      })
    }
  }

  onInputChange = (event: any) => {
    const key = event.target.name
    if (key in this.state.editableBook) {
      let editableBook = { ...this.state.editableBook }
      editableBook[key] = event.target.value
      const submitDisabled =
        !bookHasAllFields(editableBook) ||
        booksMatch(this.props.book, editableBook)

      this.setState({
        editableBook,
        submitDisabled,
      })
    }
  }

  onSubmit = async (event: any) => {
    event.preventDefault()
    const errors = validateBook(this.state.editableBook)
    if (errors.found) {
      this.setState({
        errors,
      })
    } else {
      this.setState(
        {
          errors: bookModel.emptyErrors(),
          formDisabled: true,
          topLevelError: '',
        },
        async () => {
          try {
            const book = bookModel.toAPI({
              ...this.props.book,
              ...this.state.editableBook,
            })

            await this.props.actions.updateBook(book)
            this.setState({
              editing: false,
              formDisabled: false,
            })
          } catch (err) {
            this.setState({
              formDisabled: false,
              topLevelError: err,
            })
          }
        },
      )
    }
  }

  onEditClick = () => {
    const { book } = this.props

    this.setState({
      editing: true,
      editableBook: bookModel.editable(book),
      submitDisabled: true,
    })
  }

  onCancel = (event: any) => {
    event.preventDefault()
    this.setState({ editing: false })
  }

  onBackClick = () => {
    this.props.history.push(localUrls.booksList)
  }

  showDeleteDialog = () => {
    this.setState({
      deleteDialogShowing: true,
    })
  }

  hideDeleteDialog = () => {
    this.setState({
      deleteDialogShowing: false,
    })
  }

  onDeleteDialogConfirm = async () => {
    this.setState(
      {
        topLevelError: '',
      },
      async () => {
        try {
          await this.props.actions.deleteBook(this.props.book)
          this.props.snackbarActions.createSnackbar(
            'Book successfully deleted.',
          )
          this.props.history.push(localUrls.booksList)
        } catch (err) {
          this.setState({
            deleteDialogShowing: false,
            topLevelError: err,
          })
        }
      },
    )
  }

  render() {
    const { authors, book, bookId } = this.props
    const {
      deleteDialogShowing,
      editableBook,
      editing,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state

    return (
      <CardList>
        {!book.id && (
          <Alert message={`No book found with id: ${bookId}`} type={'info'} />
        )}

        {book.id &&
          !editing && (
            <BookDetailView
              book={book}
              onBackClick={this.onBackClick}
              onDeleteClick={this.showDeleteDialog}
              onEditClick={this.onEditClick}
              topLevelError={topLevelError}
            />
          )}

        {book.id &&
          editing && (
            <BookEditView
              authors={authors}
              book={editableBook}
              disabled={formDisabled}
              errors={errors}
              onAuthorChange={this.onAuthorChange}
              onCancel={this.onCancel}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              submitDisabled={submitDisabled}
              topLevelError={topLevelError}
            />
          )}

        {deleteDialogShowing && (
          <Modal
            message={'Are you sure you want to delete this book?'}
            onCancel={this.hideDeleteDialog}
            onConfirm={this.onDeleteDialogConfirm}
            title="Confirm Deletion"
          />
        )}
      </CardList>
    )
  }
}

export default BookDetailPage
