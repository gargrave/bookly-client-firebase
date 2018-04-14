// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';
import countBy from 'lodash/countBy';

import type { Author } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';
import { localUrls } from '../../../../constants/urls';
import { fetchAuthors } from '../../../../store/actions';

import Alert from '../../../common/Alert';
import AuthorList from '../../../bookly/authors/AuthorList';
import Button from '../../../common/Button';
import CardList from '../../../common/CardList';
import InputField from '../../../common/InputField';
import RequiresAuth from '../../../common/hocs/RequiresAuth';

type Props = {
  authors: Author[],
  fetchAuthors: Function,
  history: Object,
};

type State = {
  searchValue: string,
}

class AuthorsListPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };

    const _this: any = this;
    _this.onAddClick = _this.onAddClick.bind(this);
    _this.onAuthorClick = _this.onAuthorClick.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.refreshAuthors();
  }

  async refreshAuthors() {
    try {
      await this.props.fetchAuthors();
    } catch (err) {
      // TODO: deal with this error
    }
  }

  onAddClick() {
    this.props.history.push(localUrls.authorCreate);
  }

  onAuthorClick(authorId?: string | number) {
    if (authorId) {
      this.props.history.push(`/authors/${authorId}`);
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
      authors,
    } = this.props;

    const {
      searchValue,
    } = this.state;

    return (
      <div className={buildClasses(['list-view'])}>
        <h3 className={buildClasses(['list-view__header'])}>
          My Authors
          <Button
            onClick={this.onAddClick}
            text="Add"
            type="success"
          />
        </h3>
        <CardList>
          <InputField
            boundValue={searchValue}
            name="searchValue"
            onInputChange={this.onInputChange}
            placeholder={'Filter by author name...'}
            type="search"
          />
          {searchValue &&
            <Alert
              message={`Showing results matching "${searchValue}"`}
              type="info"
            />
          }
          <AuthorList
            authors={authors}
            filterBy={searchValue}
            onAuthorClick={this.onAuthorClick}
          />
        </CardList>
      </div>
    );
  }
}

AuthorsListPage.propTypes = {
  authors: array.isRequired,
  fetchAuthors: func.isRequired,
  history: object.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  const authorCounts = countBy(state.books.data, 'author.id');
  const authors = state.authors.data.map((author: Author) => {
    return {
      ...author,
      bookCount: authorCounts[author.id] || 0,
    };
  });

  return {
    authors,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAuthors() {
    return dispatch(fetchAuthors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(AuthorsListPage, localUrls.login));
