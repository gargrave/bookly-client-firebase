import styled from 'react-emotion'
import { colors, shadows } from '../../../../styles/'

export const StyledWrapper = styled('div')`
  ${shadows.medium};

  background-color: ${colors.cardBg};
  border: solid 1px ${colors.cardBorder};
  border-radius: 5px;
  margin: 8px auto;
  max-width: 550px;
  padding: 10px 20px;

  &.hoverable:hover {
    background: ${colors.cardHoveredBg};
    cursor: pointer;
  }
`
