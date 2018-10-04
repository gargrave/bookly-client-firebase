// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import countBy from 'lodash/countBy'

import type { Author } from '../../flowtypes'

import { localUrls } from '../../../../globals/urls'

import { actions } from '../../actions'

import AuthorsListPage from '../../views/AuthorsListPage'
import AuthenticatedRoute from '../../../common/components/hocs/AuthenticatedRoute/AuthenticatedRoute'

const mapStateToProps = state => {
  const authorCounts = countBy(state.books.data, 'author.id')
  const authors = state.authors.data.map((author: Author) => {
    return {
      ...author,
      bookCount: authorCounts[author.id] || 0,
    }
  })

  return {
    authors,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedRoute(AuthorsListPage, localUrls.login))
