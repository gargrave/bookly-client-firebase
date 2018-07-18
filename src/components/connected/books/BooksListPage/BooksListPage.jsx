// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';

import type { Book } from '../../../../modules/books/flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';
import { localUrls } from '../../../../globals/urls';
import { fetchBooks } from '../../../../store/actions';

import Button from '../../../../modules/common/components/Button/Button';
import CardList from '../../../common/CardList';
import RequiresAuth from '../../../common/hocs/RequiresAuth';
import UnverifiedNotice from '../../../bookly/account/UnverifiedNotice/UnverifiedNotice';

import BooksListVerified from './BooksListVerified/BooksListVerified';

type Props = {
  books: Book[],
  fetchBooks: Function,
  history: Object,
  user: Object,
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

  onAddClick = () => {
    this.props.history.push(localUrls.bookCreate);
  }

  onBookClick = (bookId?: string | number) => {
    if (bookId) {
      this.props.history.push(`/books/${bookId}`);
    }
  }

  onInputChange = (event) => {
    const key = event.target.name;
    if (key in this.state) {
      this.setState({
        searchValue: event.target.value,
      });
    }
  }

  renderAddBookButton() {
    const { user } = this.props;
    if (!user || !user.emailVerified) {
      return null;
    }

    return (
      <Button
        onClick={this.onAddClick}
        text="Add"
        type="success"
      />
    );
  }

  renderContent() {
    const { user } = this.props;
    if (!user || !user.emailVerified) {
      return <UnverifiedNotice />;
    }

    return (
      <BooksListVerified
        books={this.props.books}
        onBookClick={this.onBookClick}
        onInputChange={this.onInputChange}
        searchValue={this.state.searchValue}
      />
    );
  }

  render() {
    return (
      <div className={buildClasses(['list-view'])}>
        <h3 className={buildClasses(['list-view__header'])}>
          My Books
          {this.renderAddBookButton()}
        </h3>
        <CardList>
          {this.renderContent()}
        </CardList>
      </div>
    );
  }
}

BooksListPage.propTypes = {
  books: array.isRequired,
  fetchBooks: func.isRequired,
  history: object,
  user: object.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => ({
  books: state.books.data,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBooks() {
    return dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(BooksListPage, localUrls.login));
