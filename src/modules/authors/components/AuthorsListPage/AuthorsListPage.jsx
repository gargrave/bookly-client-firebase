// @flow
import React, { Component } from 'react';
import { array, func, object } from 'prop-types';

import type { Author } from '../../flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';
import { localUrls } from '../../../../globals/urls';

import Button from '../../../common/components/Button/Button';
import CardList from '../../../common/components/CardList/CardList';
import UnverifiedNotice from '../../../auth/components/UnverifiedNotice/UnverifiedNotice';

import AuthorsListVerified from './AuthorsListVerified/AuthorsListVerified';

type Props = {
  authors: Author[],
  fetchAuthors: Function,
  history: Object,
  user: Object,
};

type State = {
  searchValue: string,
}

class AuthorsListPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchValue: '',
    };
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

  onAddClick = () => {
    this.props.history.push(localUrls.authorCreate);
  }

  onAuthorClick = (authorId?: string | number) => {
    if (authorId) {
      this.props.history.push(`/authors/${authorId}`);
    }
  }

  onInputChange = (event: any) => {
    const key = event.target.name;
    if (key in this.state) {
      this.setState({
        searchValue: event.target.value,
      });
    }
  }

  renderAddAuthorButton() {
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
      <AuthorsListVerified
        authors={this.props.authors}
        onAuthorClick={this.onAuthorClick}
        onInputChange={this.onInputChange}
        searchValue={this.state.searchValue}
      />
    );
  }

  render() {
    return (
      <div className={buildClasses(['list-view'])}>
        <h3 className={buildClasses(['list-view__header'])}>
          My Authors
          {this.renderAddAuthorButton()}
        </h3>
        <CardList>
          {this.renderContent()}
        </CardList>
      </div>
    );
  }
}

AuthorsListPage.propTypes = {
  authors: array.isRequired,
  fetchAuthors: func.isRequired,
  history: object.isRequired,
  user: object.isRequired,
};

export default AuthorsListPage;
