// @flow
import React, { Component } from 'react'
import { bool, func, object, shape } from 'prop-types'

import type { User } from '../../flowtypes'
import type { Profile, ProfileErrors } from '../../../profiles/flowtypes'

import { localUrls } from '../../../../globals/urls'
import { profileModel } from '../../../profiles/models'
import { profilesMatch, validateProfile } from '../../../profiles/validators'
import { sendAccountVerificationEmail } from '../../../../wrappers/auth'

import AccountDetailView from '../../components/AccountDetailView/AccountDetailView'
import AccountEditView from '../../components/AccountEditView/AccountEditView'
import CardList from '../../../common/components/CardList/CardList'

type Props = {
  actions: Object,
  history: any,
  profile: Profile,
  profileActions: Object,
  snackbarActions: Object,
  user: User,
  verificationEmailHasBeenSent: boolean,
}

type State = {
  editableProfile: Profile,
  editing: boolean,
  errors: ProfileErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
}

class AccountDetailPage extends Component<Props, State> {
  static propTypes = {
    actions: shape({
      logout: func.isRequired,
      markVerificationEmailSent: func.isRequired,
    }),
    history: object.isRequired,
    profile: object.isRequired,
    profileActions: shape({
      updateProfile: func.isRequired,
    }),
    snackbarActions: shape({
      createSnackbar: func.isRequired,
    }),
    user: object.isRequired,
    verificationEmailHasBeenSent: bool.isRequired,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      editableProfile: profileModel.empty(),
      editing: false,
      errors: profileModel.emptyErrors(),
      formDisabled: false,
      submitDisabled: true,
      topLevelError: '',
    }
  }

  onInputChange = (event: any) => {
    const key = event.target.name
    if (key in this.state.editableProfile) {
      const editableProfile = {
        ...this.state.editableProfile,
        [key]: event.target.value,
      }
      const submitDisabled = profilesMatch(this.props.profile, editableProfile)

      this.setState({
        editableProfile,
        submitDisabled,
      })
    }
  }

  onEditClick = () => {
    this.setState({
      editableProfile: { ...this.props.profile },
      editing: true,
      formDisabled: false,
      submitDisabled: true,
    })
  }

  onCancelClick = () => {
    this.setState({ editing: false })
  }

  onLogoutClick = async () => {
    await this.props.actions.logout()
    this.props.history.push(localUrls.login)
  }

  onSubmit = async (event: any) => {
    event.preventDefault()
    const errors = validateProfile(this.state.editableProfile)

    if (errors.found) {
      this.setState({ errors })
    } else {
      this.setState(
        {
          errors: profileModel.emptyErrors(),
          formDisabled: true,
          topLevelError: '',
        },
        async () => {
          try {
            const profile = profileModel.toAPI({
              ...this.props.profile,
              ...this.state.editableProfile,
            })

            await this.props.profileActions.updateProfile(profile)
            this.setState({
              editing: false,
              formDisabled: false,
            })
          } catch (err) {
            this.setState({
              formDisabled: false,
              topLevelError: err,
            })
          }
        },
      )
    }
  }

  onVerifyAccountClick = async () => {
    try {
      await sendAccountVerificationEmail()
      this.props.actions.markVerificationEmailSent()
    } catch (err) {
      this.props.snackbarActions.createSnackbar(
        'There was an error sending the email.',
      )
    }
  }

  renderDetailView() {
    const { profile, user, verificationEmailHasBeenSent } = this.props

    return (
      <AccountDetailView
        onCancelClick={this.onCancelClick}
        onEditClick={this.onEditClick}
        onLogoutClick={this.onLogoutClick}
        onVerifyAccountClick={this.onVerifyAccountClick}
        profile={profile}
        user={user}
        verificationEmailHasBeenSent={verificationEmailHasBeenSent}
      />
    )
  }

  renderEditView() {
    const {
      editableProfile,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state

    return (
      <AccountEditView
        disabled={formDisabled}
        errors={errors}
        onCancelClick={this.onCancelClick}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
        profile={editableProfile}
        submitDisabled={submitDisabled}
        topLevelError={topLevelError}
      />
    )
  }

  render() {
    const { editing } = this.state

    return (
      <CardList>
        {!editing && this.renderDetailView()}
        {editing && this.renderEditView()}
      </CardList>
    )
  }
}

export default AccountDetailPage
