// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { date, func, object, shape, string } from 'prop-types';

import type { Author } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { fetchAuthors, updateAuthor } from '../../../store/actions/author-actions';
import { authorsMatch, validateAuthor } from '../../../globals/validations';
import { parseError } from '../../../globals/errors';
import authorModel from '../../../models/Author.model';

import AuthorDetailView from '../../../components/bookly/authors/AuthorDetailView';
import AuthorEditView from '../../../components/bookly/authors/AuthorEditView';
import RequiresAuth from '../../../components/common/hocs/RequiresAuth';

type Props = {
  author: Author,
  history: Object,
  fetchAuthors: Function,
  updateAuthor: Function,
};

type State = {
  editableAuthor: Author,
  editing: boolean,
  errors: Author,
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
  errors: Author,
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
      errors: authorModel.empty(),
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
      if (!this.props.author.id) {
        this.props.history.push(localUrls.authorsList);
      } else {
        this.setState({
          formDisabled: false,
        });
      }
    } catch (err) {
      this.setState({
        topLevelError: parseError(err),
      });
    }
  }

  onInputChange(event) {
    const key = event.target.name;
    if (key in this.state.editableAuthor) {
      let editableAuthor = Object.assign({}, this.state.editableAuthor);
      editableAuthor[key] = event.target.value;
      const submitDisabled = authorsMatch(this.props.author, editableAuthor);

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
        errors: authorModel.empty(),
        formDisabled: true,
      }, async () => {
        try {
          const author = authorModel.toAPI(
            Object.assign({},
            this.props.author,
            this.state.editableAuthor
          ));

          await this.props.updateAuthor(author);
          this.setState({
            editing: false,
          });
        } catch (err) {
          this.setState({
            topLevelError: parseError(err),
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
      editableAuthor: {
        firstName: this.props.author.firstName,
        lastName: this.props.author.lastName,
      },
      editing: true,
      errors: authorModel.empty(),
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
        {!editing &&
          detailView(author, this.onBackClick.bind(this), this.onEditClick.bind(this))
        }
        {editing &&
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
    firstName: string,
    lastName: string,
    createdAt: date,
    updatedAt: date,
  }),
  fetchAuthors: func.isRequired,
  history: object,
  updateAuthor: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  const authorID = ownProps.match.params.id;
  const author = state.authors.data.find(
    (a) => String(a.id) === String(authorID) // TODO: remove this second cast once migration is complete
  ) || {};

  return {
    author,
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
