// @flow
import React, { Component } from 'react';
import { array, func, object, shape, string } from 'prop-types';

import type { Author, AuthorErrors } from '../../flowtypes';
import type { Book } from '../../../books/flowtypes';

import { localUrls } from '../../../../globals/urls';
import { authorHasAllFields, authorsMatch, validateAuthor } from '../../../authors/validators';
import { authorModel } from '../../../authors/models';

import Alert from '../../../common/components/Alert/Alert';
import AuthorDetailView from '../../components/AuthorDetailView/AuthorDetailView';
import AuthorEditView from '../../components/AuthorEditView/AuthorEditView';
import CardList from '../../../common/components/CardList/CardList';
import Modal from '../../../common/components/Modal/Modal';

type Props = {
  actions: Object,
  author: Author,
  authorId: string,
  booksForAuthor: Book[],
  history: Object,
  snackbarActions: Object,
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

const detailView = (
  author: Author,
  booksForAuthor: Book[],
  onBackClick: Function,
  onBookAddClick: Function,
  onBookClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
  topLevelError: string,
) => {
  return (
    <AuthorDetailView
      author={author}
      booksForAuthor={booksForAuthor}
      onBackClick={onBackClick}
      onBookAddClick={onBookAddClick}
      onBookClick={onBookClick}
      onDeleteClick={onDeleteClick}
      onEditClick={onEditClick}
      topLevelError={topLevelError}
    />
  );
};

const editView = (
  author: Author,
  errors: AuthorErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
) => {
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
};

class AuthorDetailPage extends Component<Props, State> {
  static propTypes = {
    actions: shape({
      deleteAuthor: func.isRequired,
      fetchAuthors: func.isRequired,
      setPreselectedAuthor: func.isRequired,
      updateAuthor: func.isRequired,
    }).isRequired,
    author: object.isRequired,
    authorId: string,
    booksForAuthor: array,
    history: object,
    snackbarActions: shape({
      createSnackbar: func.isRequired,
    }).isRequired,
  };

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
    _this.onBookClick = _this.onBookClick.bind(this);
    _this.onBookAddClick = _this.onBookAddClick.bind(this);
    _this.onDeleteDialogConfirm = _this.onDeleteDialogConfirm.bind(this);
    _this.onEditClick = _this.onEditClick.bind(this);
    _this.showDeleteDialog = _this.showDeleteDialog.bind(this);
  }

  componentDidMount() {
    this.refreshAuthors();
  }

  async refreshAuthors() {
    try {
      await this.props.actions.fetchAuthors();
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

  onInputChange(event: any) {
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

  async onSubmit(event: any) {
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

          await this.props.actions.updateAuthor(author);
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

  onCancel(event: any) {
    event.preventDefault();
    this.setState({ editing: false });
  }

  onBackClick() {
    this.props.history.push(localUrls.authorsList);
  }

  onBookClick(id: number) {
    this.props.history.push(`${localUrls.booksList}/${id}`);
  }

  onBookAddClick(author: any) {
    if (author && author.id) {
      this.props.actions.setPreselectedAuthor(author);
    }
    this.props.history.push(localUrls.bookCreate);
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
        await this.props.actions.deleteAuthor(this.props.author);
        this.props.snackbarActions.createSnackbar('Author successfully deleted.');
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
      booksForAuthor,
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
          detailView(author, booksForAuthor, this.onBackClick, this.onBookAddClick,
            this.onBookClick, this.showDeleteDialog, this.onEditClick, topLevelError)
        }
        {author.id && editing &&
          editView(editableAuthor, errors, formDisabled, submitDisabled, topLevelError,
            this.onCancel.bind(this), this.onInputChange.bind(this), this.onSubmit.bind(this))
        }
        {deleteDialogShowing &&
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

export default AuthorDetailPage;
