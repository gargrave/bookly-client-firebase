// @flow
import React, { Component } from 'react';
import { array, func, object, shape } from 'prop-types';

import type { Author } from '../../../authors/flowtypes';
import type { Book, BookErrors } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';
import { buildClasses } from '../../../../utils/cssHelpers';

import { bookModel } from '../../models';
import { bookHasAllFields, validateBook } from '../../validators';

import BookForm from '../../components/BookForm/BookForm';
import Card from '../../../common/components/Card/Card';
import CardList from '../../../common/components/CardList/CardList';

type Props = {
  actions: Object,
  authorActions: Object,
  authors: Author[],
  history: Object,
  preselectedAuthor: Author,
};

type State = {
  book: Book,
  errors: BookErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
};

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
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      book: bookModel.empty(),
      errors: bookModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: true,
      topLevelError: '',
    };
  }

  async componentDidMount() {
    try {
      await this.props.authorActions.fetchAuthors();
      await this.props.actions.fetchBooks();

      if (this.props.preselectedAuthor) {
        this.updateAuthor(this.props.preselectedAuthor.id);
        this.props.authorActions.clearPreselectedAuthor();
      }

      this.setState({
        formDisabled: false,
      });
    } catch (err) {
      console.log('TODO: deal with this error!');
      console.log(err);
    }
  }

  updateAuthor(authorId?: string) {
    const author = this.props.authors.find((a) => a.id === authorId);
    const book = { ...this.state.book, author };
    const submitDisabled = !bookHasAllFields(book);

    if (author) {
      this.setState({
        book,
        submitDisabled,
      });
    }
  }

  onAuthorChange = (event: any) => {
    const authorId = event.target.value;
    this.updateAuthor(authorId);
  }

  onInputChange = (event: any) => {
    const key = event.target.name;
    if (key in this.state.book) {
      const book = { ...this.state.book };
      book[key] = event.target.value;
      const submitDisabled = !bookHasAllFields(book);

      this.setState({
        book,
        submitDisabled,
      });
    }
  }

  onSubmit = async (event: any) => {
    event.preventDefault();
    const errors = validateBook(this.state.book);
    if (errors.found) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        errors: bookModel.emptyErrors(),
        formDisabled: true,
        topLevelError: '',
      }, async() => {
        try {
          const book = bookModel.toAPI(this.state.book);
          await this.props.actions.createBook(book);
          this.props.history.push(localUrls.booksList);
        } catch (err) {
          this.setState({
            formDisabled: false,
            topLevelError: err,
          });
        }
      });
    }
  }

  onCancel = (event: any) => {
    event.preventDefault();
    this.props.history.push(localUrls.booksList);
  }

  render() {
    const {
      authors,
      preselectedAuthor,
    } = this.props;
    const {
      book,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state;

    return (
      <div className={buildClasses(['create-view', 'book-create-view'])}>
        <CardList>
          <Card
            header={'New Book'}
            hoverable={false}
          >
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
    );
  }
}

export default BookCreatePage;
