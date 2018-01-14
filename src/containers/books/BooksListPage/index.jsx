// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';

import type { Book, ViewSettings } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { fetchBooks } from '../../../store/actions/bookActions';

import Alert from '../../../components/common/Alert';
import Button from '../../../components/common/Button';
import BookList from '../../../components/bookly/books/BookList';
import CardList from '../../../components/common/CardList';
import InputField from '../../../components/common/InputField';
import RequiresAuth from '../../../components/common/hocs/RequiresAuth';

type Props = {
  books: Book[],
  fetchBooks: Function,
  history: Object,
  viewSettings: ViewSettings,
};

type State = {
  searchValue: string,
}

class BooksListPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchValue: '',
    };

    const _this: any = this;
    _this.onAddClick = _this.onAddClick.bind(this);
    _this.onBookClick = _this.onBookClick.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.refreshBooks();
  }

  async refreshBooks() {
    try {
      await this.props.fetchBooks();
    } catch (err) {
      console.log('TODO: deal with this error!');
      console.log(err);
    }
  }

  onAddClick() {
    this.props.history.push(localUrls.bookCreate);
  }

  onBookClick(bookId?: string | number) {
    if (bookId) {
      this.props.history.push(`/books/${bookId}`);
    }
  }

  onInputChange(event) {
    const key = event.target.name;
    if (key in this.state) {
      this.setState({
        searchValue: event.target.value,
      });
    }
  }

  render() {
    const {
      books,
      viewSettings,
    } = this.props;

    const {
      searchValue,
    } = this.state;

    return (
      <div>
        <h2>
          My Books
          <Button
            onClick={this.onAddClick}
            text="Add"
            type="success"
          />
        </h2>
        <CardList>
          <InputField
            boundValue={searchValue}
            name="searchValue"
            onInputChange={this.onInputChange}
            placeholder={'Filter by title...'}
            type="search"
          />
          {searchValue &&
            <Alert
              message={`Showing results matching "${searchValue}"`}
              type="info"
            />
          }
          <BookList
            books={books}
            filterBy={searchValue}
            onBookClick={this.onBookClick}
            showAuthors={!(viewSettings.groupBooksByAuthor)}
          />
        </CardList>
      </div>
    );
  }
}

BooksListPage.propTypes = {
  books: array.isRequired,
  fetchBooks: func.isRequired,
  history: object,
  viewSettings: object.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => ({
  books: state.books.data,
  viewSettings: state.settings.view,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBooks() {
    return dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(BooksListPage, localUrls.login));
