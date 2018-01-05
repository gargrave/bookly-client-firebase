// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { instanceOf, func, object, oneOfType, shape, string } from 'prop-types';

import type { Author, AuthorErrors } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { authorHasAllFields, authorsMatch, validateAuthor } from '../../../globals/validations';
import { authorModel } from '../../../models/Author.model';
import { fetchAuthors, updateAuthor } from '../../../store/actions/authorActions';

import Alert from '../../../components/common/Alert';
import AuthorDetailView from '../../../components/bookly/authors/AuthorDetailView';
import AuthorEditView from '../../../components/bookly/authors/AuthorEditView';
import RequiresAuth from '../../../components/common/hocs/RequiresAuth';

type Props = {
  author: Author,
  authorId: string,
  history: Object,
  fetchAuthors: Function,
  updateAuthor: Function,
};

type State = {
  editableAuthor: Author,
  editing: boolean,
  errors: AuthorErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
};

function detailView(
  author: Author,
  onBackClick: Function,
  onEditClick: Function,
) {
  return (
    <AuthorDetailView
      author={author}
      onBackClick={onBackClick}
      onEditClick={onEditClick}
    />
  );
}

function editView(
  author: Author,
  errors: AuthorErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
) {
  return (
    <AuthorEditView
      author={author}
      disabled={formDisabled}
      errors={errors}
      onCancel={onCancel}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      topLevelError={topLevelError}
    />
  );
}

class AuthorDetailPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editableAuthor: authorModel.empty(),
      editing: false,
      errors: authorModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: false,
      topLevelError: '',
    };
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
        formDisabled: false,
        topLevelError: err,
      });
    }
  }

  onInputChange(event) {
    const key = event.target.name;
    if (key in this.state.editableAuthor) {
      let editableAuthor = { ...this.state.editableAuthor};
      editableAuthor[key] = event.target.value;
      const submitDisabled =
        authorsMatch(this.props.author, editableAuthor) ||
        !authorHasAllFields(editableAuthor);

      this.setState({
        editableAuthor,
        submitDisabled,
      });
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    const errors = validateAuthor(this.state.editableAuthor);
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
          const author = authorModel.toAPI({
            ...this.props.author,
            ...this.state.editableAuthor,
          });

          await this.props.updateAuthor(author);
          this.setState({
            editing: false,
            formDisabled: false,
          });
        } catch (err) {
          this.setState({
            formDisabled: false,
            topLevelError: err,
          });
        }
      });
    }
  }

  /**
   * Enables 'editing' state and sets the editable author's value
   * to the current author from the store.
   */
  onEditClick() {
    this.setState({
      editableAuthor: authorModel.editable(this.props.author),
      editing: true,
      errors: authorModel.emptyErrors(),
      formDisabled: false,
      submitDisabled: true,
    });
  }

  /**
   * Disables 'editing' state.
   */
  onCancel(event) {
    event.preventDefault();
    this.setState({ editing: false });
  }

  onBackClick() {
    this.props.history.push(localUrls.authorsList);
  }

  render() {
    const {
      author,
      authorId,
    } = this.props;
    const {
      editableAuthor,
      editing,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state;

    return (
      <div>
        {!author.id &&
          <Alert
            message={`No author found with id: ${authorId}`}
            type={'info'}
          />
        }
        {author.id && !editing &&
          detailView(author, this.onBackClick.bind(this), this.onEditClick.bind(this))
        }
        {author.id && editing &&
          editView(editableAuthor, errors, formDisabled, submitDisabled, topLevelError,
            this.onCancel.bind(this), this.onInputChange.bind(this), this.onSubmit.bind(this))
        }
      </div>
    );
  }
}

AuthorDetailPage.propTypes = {
  author: shape({
    id: string,
    created: oneOfType([
      instanceOf(Date),
      string,
    ]),
    updated: oneOfType([
      instanceOf(Date),
      string,
    ]),
    firstName: string,
    lastName: string,
  }).isRequired,
  authorId: string,
  fetchAuthors: func.isRequired,
  history: object,
  updateAuthor: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  const authorId = ownProps.match.params.id;
  const author = state.authors.data.find(
    (a) => a.id === authorId
  ) || {};

  return {
    author,
    authorId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAuthors() {
    return dispatch(fetchAuthors());
  },

  updateAuthor(author) {
    return dispatch(updateAuthor(author));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(AuthorDetailPage, localUrls.login));
