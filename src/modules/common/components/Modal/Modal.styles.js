import styled from 'react-emotion'

import { colors, shadows } from '../../../../styles'

export const ModalWrapper = styled('div')`
  background-color: ${colors.cardBg};
  border: solid 1px #bbb;
  border-radius: 5px;
  box-shadow: ${shadows.light};
  left: 50%;
  margin: 8px auto;
  max-width: 450px;
  min-width: 240px;
  position: absolute;
  top: 25%;
  transform: translate(-50%, -50%);
  width: 90%;
  z-index: 100;
`
