// @flow
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { array, bool, number, object, string } from 'prop-types';

import { buildClass } from '../../../../utils/cssHelpers';

import styles from './SexyHeader.css';

type Props = {
  height?: number,
  history: Object,
  loggedIn: boolean,
  loggedInLinks?: any[],
  notLoggedInLinks?: any[],
  title: string,
};

const extraStyles = (height?: number) => ({
  height: height || 50,
});

class SexyHeader extends React.Component<Props> {
  static propTypes = {
    height: number,
    history: object,
    loggedIn: bool,
    loggedInLinks: array,
    notLoggedInLinks: array,
    title: string,
  };

  isActiveLink(linkTo: string) {
    return this.props.history.location.pathname === linkTo;
  }

  renderLinks(links?: any[] = []) {
    return (
      links.map((link: any) =>
        <Link
          className={buildClass(
            styles.link,
            { [styles.activeLink]: this.isActiveLink(link.to) }
          )}
          key={link.to}
          to={link.to}>
          {link.text}
        </Link>
      )
    );
  }

  render() {
    const {
      height,
      loggedIn,
      loggedInLinks,
      notLoggedInLinks,
      title,
    } = this.props;

    return (
      <header
        className={styles.header}
        style={extraStyles(height)}>
        <h3
          className={styles.title}
          style={{ lineHeight: `${+height * .9}px` }}>
          {title}
        </h3>
        <div className={styles.links}>
          {loggedIn && this.renderLinks(loggedInLinks)}
          {!loggedIn && this.renderLinks(notLoggedInLinks)}
        </div>
      </header>
    );
  }
}

export default withRouter(SexyHeader);
