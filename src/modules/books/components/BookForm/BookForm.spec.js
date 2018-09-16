import { ComponentBuilder } from '../../../../utils/testHelpers'
import { authorModel } from '../../../authors/models'
import { bookModel } from '../../models'

import Form from '../../../common/components/Form/Form'
import InputField from '../../../common/components/InputField/InputField'

import BookForm from './BookForm'

const defaultProps = {
  authors: [],
  book: {
    author: {
      id: '98hfjsdbf9s8fhdf',
      ...authorModel.empty(),
    },
    sortBy: '',
    title: '',
  },
  disabled: false,
  errors: bookModel.emptyErrors(),
  onAuthorChange: jest.fn(),
  onCancel: jest.fn(),
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
  topLevelError: '',
}

const builder = new ComponentBuilder(BookForm, defaultProps)

describe('BookForm', () => {
  let component

  describe('with "book" populated', () => {
    it('renders correctly', () => {
      component = builder.shallowGetComponent()
      expect(component).toMatchSnapshot()
      expect(component.find(Form)).toHaveLength(1)
      expect(component.find(InputField)).toHaveLength(2)
    })
  })
})
