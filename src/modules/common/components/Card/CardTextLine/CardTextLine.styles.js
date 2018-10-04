import styled from 'react-emotion'

import { colors } from '../../../../../styles'

export const CardTextLine = styled('div')`
  color: ${colors.textLight};
  margin-bottom: 0;

  &.bold,
  &.title {
    color: ${colors.textMed};
    font-weight: bold;
  }

  &.subtext {
    color: ${colors.textMedLight};
    font-size: 0.9em;
  }
`
