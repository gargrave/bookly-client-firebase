// @flow
import React, { Component } from 'react'
import { func, object, shape } from 'prop-types'
import styled from 'react-emotion'

import type { Author, AuthorErrors } from '../../flowtypes'

import { localUrls } from '../../../../globals/urls'
import { views } from '../../../../styles'
import { authorHasAllFields, validateAuthor } from '../../../authors/validators'
import { authorModel } from '../../../authors/models'

import AuthorForm from '../../components/AuthorForm/AuthorForm'
import Card from '../../../common/components/Card/Card'
import CardList from '../../../common/components/CardList/CardList'

type Props = {
  actions: Object,
  history: Object,
}

type State = {
  author: Author,
  errors: AuthorErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
}

const Styled = styled('div')`
  ${views.viewWrapper};
`

class AuthorCreatePage extends Component<Props, State> {
  static propTypes = {
    actions: shape({
      createAuthor: func.isRequired,
      fetchAuthors: func.isRequired,
    }).isRequired,
    history: object,
  }

  state = {
    author: authorModel.empty(),
    errors: authorModel.emptyErrors(),
    formDisabled: true,
    submitDisabled: true,
    topLevelError: '',
  }

  componentDidMount() {
    this.refreshAuthors()
  }

  async refreshAuthors() {
    try {
      await this.props.actions.fetchAuthors()
      this.setState({
        formDisabled: false,
      })
    } catch (err) {
      this.setState({
        topLevelError: err,
      })
    }
  }

  onInputChange = (event: any) => {
    const key = event.target.name
    if (key in this.state.author) {
      const author = { ...this.state.author }
      author[key] = event.target.value
      const submitDisabled = !authorHasAllFields(author)

      this.setState({
        author,
        submitDisabled,
      })
    }
  }

  onSubmit = async (event: any) => {
    event.preventDefault()
    const errors = validateAuthor(this.state.author)
    if (errors.found) {
      this.setState({
        errors,
      })
    } else {
      this.setState(
        {
          errors: authorModel.emptyErrors(),
          formDisabled: true,
          topLevelError: '',
        },
        async () => {
          try {
            const author = authorModel.toAPI(this.state.author)
            await this.props.actions.createAuthor(author)
            this.props.history.push(localUrls.authorsList)
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

  onCancel = (event: any) => {
    event.preventDefault()
    this.props.history.push(localUrls.authorsList)
  }

  render() {
    const {
      author,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state

    return (
      <Styled>
        <CardList>
          <Card>
            <Card.Header text="New Author" />
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
      </Styled>
    )
  }
}

export default AuthorCreatePage
