// @flow
import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { array, number, object, string } from 'prop-types'

import { buildClass } from '../../../../utils/cssHelpers'

import styles from './SexyHeader.css'

type Props = {
  height?: number,
  history: Object,
  links?: any[],
  title: string,
}

const extraStyles = (height?: number) => ({
  height: height || 50,
})

class SexyHeader extends React.Component<Props> {
  static propTypes = {
    height: number,
    history: object,
    links: array,
    title: string,
  }

  isActiveLink(linkTo: string) {
    return this.props.history.location.pathname === linkTo
  }

  renderLinks(links?: any[] = []) {
    return links.map((link: any) => (
      <Link
        className={buildClass(styles.link, {
          [styles.activeLink]: this.isActiveLink(link.to),
        })}
        key={link.to}
        to={link.to}
      >
        {link.text}
      </Link>
    ))
  }

  render() {
    const { height, links, title } = this.props
    return (
      <header className={styles.header} style={extraStyles(height)}>
        <h3
          className={styles.title}
          style={{ lineHeight: `${+height * 0.9}px` }}
        >
          {title}
        </h3>
        <div className={styles.links}>{this.renderLinks(links)}</div>
      </header>
    )
  }
}

export default withRouter(SexyHeader)
