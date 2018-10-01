import { css } from 'react-emotion'

function slideInFromViewportBottom(height, duration = '300ms') {
  return css`
    .slideInUp-enter {
      top: 100%;
    }

    .slideInUp-enter-active {
      top: calc(100% - ${height});
      transition: top ${duration};
    }

    .slideInUp-exit {
      top: calc(100% - ${height});
    }

    .slideInUp-exit-active {
      top: 100%;
      transition: top ${duration};
    }
  `
}

export default { slideInFromViewportBottom }
