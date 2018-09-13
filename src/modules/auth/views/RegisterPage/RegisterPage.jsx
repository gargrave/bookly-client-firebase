// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { func, object, shape } from 'prop-types'

import type { RegisterErrors, RegisterUser } from '../../flowtypes'

import { localUrls } from '../../../../globals/urls'
import {
  registerUserHasAllFields,
  validateRegisterUser,
} from '../../../auth/validators'
import { registerUserModel } from '../../../auth/models'
import { sendAccountVerificationEmail } from '../../../../wrappers/auth'

import Card from '../../../common/components/Card/Card'
import CardList from '../../../common/components/CardList/CardList'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

import styles from './RegisterPage.css'

type Props = {
  actions: Object,
  history: any,
}

type State = {
  errors: RegisterErrors,
  formDisabled: boolean,
  registerUser: RegisterUser,
  submitDisabled: boolean,
  topLevelError: string,
}

class RegisterPage extends React.Component<Props, State> {
  static propTypes = {
    actions: shape({
      register: func.isRequired,
    }),
    history: object.isRequired,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      errors: registerUserModel.emptyErrors(),
      formDisabled: false,
      submitDisabled: true,
      topLevelError: '',
      registerUser: registerUserModel.empty(),
    }
  }

  onInputChange = (event: any) => {
    const key = event.target.name
    if (key in this.state.registerUser) {
      const registerUser = this.state.registerUser
      registerUser[key] = event.target.value
      const submitDisabled = !registerUserHasAllFields(registerUser)

      this.setState({
        registerUser,
        submitDisabled,
      })
    }
  }

  onSubmit = async (event: any) => {
    event.preventDefault()
    const errors = validateRegisterUser(this.state.registerUser)
    if (errors.found) {
      this.setState({
        errors,
      })
    } else {
      this.setState(
        {
          errors: registerUserModel.emptyErrors(),
          formDisabled: true,
          topLevelError: '',
        },
        async () => {
          try {
            const registerUser = registerUserModel.toAPI(
              this.state.registerUser,
            )
            await this.props.actions.register(registerUser)
            sendAccountVerificationEmail()
            this.props.history.push(localUrls.account)
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

  render() {
    const { errors, formDisabled, registerUser, submitDisabled } = this.state

    return (
      <div className={styles.registerView}>
        <CardList>
          <Card header="Create an Account">
            <RegisterForm
              disabled={formDisabled}
              errors={errors}
              registerUser={registerUser}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              submitBtnText="Register"
              submitDisabled={submitDisabled}
              topLevelError={this.state.topLevelError}
            />
          </Card>
          <p className={styles.loginLink}>
            or <Link to={localUrls.login}>sign in to your account</Link>
          </p>
        </CardList>
      </div>
    )
  }
}

export default RegisterPage
