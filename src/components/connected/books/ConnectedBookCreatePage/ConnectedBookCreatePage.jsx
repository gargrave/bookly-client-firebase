// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';

import type { Author } from '../../../../globals/flowtypes';

import { localUrls } from '../../../../globals/urls';
import { clearPreselectedAuthor, fetchAuthors } from '../../../../store/actions';
import { createBook, fetchBooks } from '../../../../store/actions';

import BookCreatePage from '../../../bookly/books/BookCreatePage/BookCreatePage';
import RequiresAuth from '../../../common/hocs/RequiresAuth';

type Props = {
  authors: Author[],
  clearPreselectedAuthor: Function,
  createBook: Function,
  fetchAuthors: Function,
  fetchBooks: Function,
  history: Object,
  preselectedAuthor: Author,
};

class ConnectedBookCreatePage extends Component<Props> {
  static propTypes = {
    authors: array.isRequired,
    clearPreselectedAuthor: func.isRequired,
    createBook: func.isRequired,
    fetchAuthors: func.isRequired,
    fetchBooks: func.isRequired,
    history: object,
    preselectedAuthor: object,
  };

  onSuccess = () => {
    this.props.history.push(localUrls.booksList);
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.history.push(localUrls.booksList);
  }

  render() {
    const {
      history, // eslint-disable-line no-unused-vars
      ...childProps
    } = this.props;

    return (
      <BookCreatePage
        onCancel={this.onCancel}
        onSuccess={this.onSuccess}
        {...childProps}
      />
    );
  }
}

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => ({
  authors: state.authors.data,
  preselectedAuthor: state.authors.preselectedAuthor,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearPreselectedAuthor() {
    return dispatch(clearPreselectedAuthor());
  },

  createBook(book) {
    return dispatch(createBook(book));
  },

  fetchAuthors() {
    return dispatch(fetchAuthors());
  },

  fetchBooks() {
    return dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(ConnectedBookCreatePage, localUrls.login)
);
