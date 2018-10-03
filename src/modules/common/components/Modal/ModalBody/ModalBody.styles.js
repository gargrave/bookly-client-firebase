import styled from 'react-emotion'

export const ModalBody = styled('div')`
  margin-bottom: 0;
  padding: 20px;
  padding-bottom: 0;
`

const marginBottom = '1em' // Shoelace override
export const ModalBodyText = styled('p')`
  margin-bottom: ${marginBottom};
`
