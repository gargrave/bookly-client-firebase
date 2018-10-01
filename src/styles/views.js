import { css } from 'react-emotion'

import alignment from './alignment'
import breakpoints from './breakpoints'
import spacing from './spacing'

const viewWrapper = css`
  padding-top: 0;
  @media only screen and (min-width: ${breakpoints.small}) {
    padding-top: ${spacing.xlarge};
  }
`

const listView = css`
  padding-top: 0;
  @media only screen and (min-width: ${breakpoints.small}) {
    padding-top: ${spacing.med};
  }
`

const listViewHeader = css`
  ${alignment.centerAlignedHeader}
  margin-bottom: ${spacing.med};
`

export default { listView, listViewHeader, viewWrapper }
