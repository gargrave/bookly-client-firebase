// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import type { Author } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { createAuthor, fetchAuthors } from '../../../store/actions/author-actions';
import { validateAuthor } from '../../../globals/validations';
import { parseError } from '../../../globals/errors';
import { authorModel } from '../../../models/Author.model';

import AuthorForm from '../../../components/bookly/authors/AuthorForm';
import Card from '../../../components/common/Card';
import RequiresAuth from '../../../components/common/hocs/RequiresAuth';

type Props = {
  createAuthor: Function,
  fetchAuthors: Function,
  history: Object,
};

type State = {
  author: Author,
  errors: Author,
  formDisabled: boolean,
  topLevelError: string,
};

class AuthorCreatePage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      author: authorModel.empty(),
      errors: authorModel.empty(),
      formDisabled: true,
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
        topLevelError: parseError(err),
      });
    }
  }

  onInputChange(event) {
    const key = event.target.name;
    if (key in this.state.author) {
      const author = Object.assign({}, this.state.author);
      author[key] = event.target.value;
      this.setState({ author });
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    const errors = validateAuthor(this.state.author);
    if (errors.found) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        errors: authorModel.empty(),
        formDisabled: true,
      }, async () => {
        try {
          const author = authorModel.toAPI(this.state.author);
          await this.props.createAuthor(author);
          this.props.history.push(localUrls.authorsList);
        } catch (err) {
          this.setState({
            topLevelError: parseError(err),
          });
        }
      });
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.props.history.push(localUrls.authorsList);
  }

  render() {
    const {
      author,
      errors,
      formDisabled,
    } = this.state;

    return (
      <Card
        classes={['card--top-margin-med']}
        header={"New Author"}
        hoverable={false}
      >
        <AuthorForm
          author={author}
          disabled={formDisabled}
          errors={errors}
          onCancel={this.onCancel}
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
      </Card>
    );
  }
}

AuthorCreatePage.propTypes = {
  createAuthor: func.isRequired,
  fetchAuthors: func.isRequired,
  history: object,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createAuthor(author) {
    return dispatch(createAuthor(author));
  },

  fetchAuthors() {
    return dispatch(fetchAuthors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(AuthorCreatePage, localUrls.login));
