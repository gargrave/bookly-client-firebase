import { ComponentBuilder } from '../../../../utils/testHelpers'

import Alert from '../../../common/components/Alert/Alert'
import Button from '../../../common/components/Button/Button'

import Form from './Form'

const defaultProps = {
  cancelBtnText: 'Cancel',
  children: [],
  classes: [],
  disabled: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  submitBtnText: 'Submit',
  submitDisabled: false,
  topLevelError: '',
}

const builder = new ComponentBuilder(Form, defaultProps)

describe('Form', () => {
  let component

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent()
    expect(component).toMatchSnapshot()
  })

  describe('basic rendering', () => {
    it('renders correctly', () => {
      component = builder.mountComponent()
      expect(component.find(Alert)).toHaveLength(0)
      expect(component.find(Button)).toHaveLength(2)
    })

    it('does not render "cancel" button if prop is empty', () => {
      component = builder.mountComponent({
        onCancel: null,
      })
      expect(component.find(Button)).toHaveLength(1)
    })

    it('renders an Alert if the prop is present', () => {
      component = builder.mountComponent({
        topLevelError: 'OMFG',
      })
      expect(component.find(Alert)).toHaveLength(1)
    })
  })
})
