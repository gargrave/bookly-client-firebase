import { css } from 'react-emotion'

const light = css`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.12);
`

const medium = css`
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.12),
    0px 3px 4px 0px rgba(0, 0, 0, 0.08), 0px 1px 9px 0px rgba(0, 0, 0, 0.08);
`

const heavy = css`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`

export default { light, medium, heavy }
