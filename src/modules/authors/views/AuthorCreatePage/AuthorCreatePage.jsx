// @flow
import React, { Component } from 'react';
import { func, object } from 'prop-types';

import type { Author, AuthorErrors } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';
import { authorHasAllFields, validateAuthor } from '../../../authors/validators';
import { authorModel } from '../../../authors/models';
import { buildClasses } from '../../../../globals/utils/cssHelpers';

import AuthorForm from '../../components/AuthorForm/AuthorForm';
import Card from '../../../common/components/Card/Card';
import CardList from '../../../common/components/CardList/CardList';

type Props = {
  createAuthor: Function,
  fetchAuthors: Function,
  history: Object,
};

type State = {
  author: Author,
  errors: AuthorErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
};

class AuthorCreatePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      author: authorModel.empty(),
      errors: authorModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: true,
      topLevelError: '',
    };

    const _this: any = this;
    _this.onCancel = _this.onCancel.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
    _this.onSubmit = _this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.refreshAuthors();
  }

  async refreshAuthors() {
    try {
      await this.props.fetchAuthors();
      this.setState({
        formDisabled: false,
      });
    } catch (err) {
      this.setState({
        topLevelError: err,
      });
    }
  }

  onInputChange(event: any) {
    const key = event.target.name;
    if (key in this.state.author) {
      const author = { ...this.state.author };
      author[key] = event.target.value;
      const submitDisabled = !authorHasAllFields(author);

      this.setState({
        author,
        submitDisabled,
      });
    }
  }

  async onSubmit(event: any) {
    event.preventDefault();
    const errors = validateAuthor(this.state.author);
    if (errors.found) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        errors: authorModel.emptyErrors(),
        formDisabled: true,
        topLevelError: '',
      }, async () => {
        try {
          const author = authorModel.toAPI(this.state.author);
          await this.props.createAuthor(author);
          this.props.history.push(localUrls.authorsList);
        } catch (err) {
          this.setState({
            formDisabled: false,
            topLevelError: err,
          });
        }
      });
    }
  }

  onCancel(event: any) {
    event.preventDefault();
    this.props.history.push(localUrls.authorsList);
  }

  render() {
    const {
      author,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state;

    return (
      <div className={buildClasses(['create-view', 'author-create-view'])}>
        <CardList>
          <Card
            header={'New Author'}
            hoverable={false}
          >
            <AuthorForm
              author={author}
              disabled={formDisabled}
              errors={errors}
              onCancel={this.onCancel}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              submitDisabled={submitDisabled}
              topLevelError={topLevelError}
            />
          </Card>
        </CardList>
      </div>
    );
  }
}

AuthorCreatePage.propTypes = {
  createAuthor: func.isRequired,
  fetchAuthors: func.isRequired,
  history: object,
};

export default AuthorCreatePage;