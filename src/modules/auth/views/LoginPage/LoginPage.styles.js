import styled from 'react-emotion'

import { typography, views } from '../../../../styles'

export const StyledWrapper = styled('div')`
  ${views.viewWrapper};
`

export const StyledResetLink = styled('div')`
  margin-bottom: 0.5em;
  text-align: left;
`

export const StyledAccountLink = styled('p')`
  ${typography.bigLink};
`
