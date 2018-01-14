// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { instanceOf, func, object, oneOfType, shape, string } from 'prop-types';

import type { Author, AuthorErrors } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { authorHasAllFields, authorsMatch, validateAuthor } from '../../../globals/validations';
import { authorModel } from '../../../models/Author.model';
import { deleteAuthor, fetchAuthors, updateAuthor } from '../../../store/actions/authorActions';
import { createSnackbar } from '../../../store/actions/snackbarActions';

import Alert from '../../../components/common/Alert';
import AuthorDetailView from '../../../components/bookly/authors/AuthorDetailView';
import AuthorEditView from '../../../components/bookly/authors/AuthorEditView';
import CardList from '../../../components/common/CardList';
import Modal from '../../../components/common/Modal';
import RequiresAuth from '../../../components/common/hocs/RequiresAuth';

type Props = {
  author: Author,
  authorId: string,
  createSnackbar: Function,
  deleteAuthor: Function,
  history: Object,
  fetchAuthors: Function,
  updateAuthor: Function,
};

type State = {
  deleteDialogShowing: boolean,
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
  onDeleteClick: Function,
  onEditClick: Function,
) {
  return (
    <AuthorDetailView
      author={author}
      onBackClick={onBackClick}
      onDeleteClick={onDeleteClick}
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
      deleteDialogShowing: false,
      editableAuthor: authorModel.empty(),
      editing: false,
      errors: authorModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: false,
      topLevelError: '',
    };

    const _this: any = this;
    _this.hideDeleteDialog = _this.hideDeleteDialog.bind(this);
    _this.onBackClick = _this.onBackClick.bind(this);
    _this.onDeleteDialogConfirm = _this.onDeleteDialogConfirm.bind(this);
    _this.onEditClick = _this.onEditClick.bind(this);
    _this.showDeleteDialog = _this.showDeleteDialog.bind(this);
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

  showDeleteDialog() {
    this.setState({
      deleteDialogShowing: true,
    });
  }

  hideDeleteDialog() {
    this.setState({
      deleteDialogShowing: false,
    });
  }

  async onDeleteDialogConfirm() {
    this.setState({
      topLevelError: '',
    }, async () => {
      try {
        await this.props.deleteAuthor(this.props.author);
        this.props.createSnackbar('Author successfully deleted.');
        this.props.history.push(localUrls.authorsList);
      } catch (err) {
        console.warn('TODO: show "topLevelError" in AuthorDetailView');
        this.setState({
          deleteDialogShowing: false,
          topLevelError: err,
        });
      }
    });
  }

  render() {
    const {
      author,
      authorId,
    } = this.props;
    const {
      deleteDialogShowing,
      editableAuthor,
      editing,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state;

    return (
      <CardList>
        {!author.id &&
          <Alert
            message={`No author found with id: ${authorId}`}
            type={'info'}
          />
        }
        {author.id && !editing &&
          detailView(author, this.onBackClick, this.showDeleteDialog, this.onEditClick)
        }
        {author.id && editing &&
          editView(editableAuthor, errors, formDisabled, submitDisabled, topLevelError,
            this.onCancel.bind(this), this.onInputChange.bind(this), this.onSubmit.bind(this))
        }
        {deleteDialogShowing &&
          /* TODO: move this to a separate function */
          <Modal
            message={[
              'Are you sure you want to delete this author?',
              'All books by this author will also be deleted.',
            ]}
            onCancel={this.hideDeleteDialog}
            onConfirm={this.onDeleteDialogConfirm}
            title="Confirm Deletion"
          />
        }
      </CardList>
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
  createSnackbar: func.isRequired,
  deleteAuthor: func.isRequired,
  fetchAuthors: func.isRequired,
  history: object,
  updateAuthor: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state: any, ownProps: any) => {
  const authorId = ownProps.match.params.id;
  const author = state.authors.data.find(
    (a) => a.id === authorId
  ) || {};

  return {
    author,
    authorId,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  createSnackbar(message: string) {
    return dispatch(createSnackbar(message));
  },

  deleteAuthor(author: Author) {
    return dispatch(deleteAuthor(author));
  },

  fetchAuthors() {
    return dispatch(fetchAuthors());
  },

  updateAuthor(author) {
    return dispatch(updateAuthor(author));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(AuthorDetailPage, localUrls.login));
