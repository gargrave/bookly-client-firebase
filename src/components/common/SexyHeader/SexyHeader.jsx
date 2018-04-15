// @flow
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { array, bool, number, object, string } from 'prop-types';

import { buildClasses } from '../../../globals/utils/cssHelpers';

import './SexyHeader.css';

type Props = {
  height?: number,
  history: Object,
  loggedIn: boolean,
  loggedInLinks?: any[],
  notLoggedInLinks?: any[],
  title: string,
};

const styles = (height?: number) => ({
  height: height || 50,
});

class SexyHeader extends React.Component<Props> {
  isActiveLink(linkTo: string) {
    return this.props.history.location.pathname === linkTo;
  }

  renderLinks(links?: any[] = []) {
    return (
      links.map((link: any) =>
        <Link
          className={buildClasses([
            'header__link',
            this.isActiveLink(link.to) ? 'header__link--active' : '',
          ])}
          key={link.to}
          to={link.to}
        >
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
        className={buildClasses(['header'])}
        style={styles(height)}
      >
        <h3
          className={buildClasses(['header__title'])}
          style={{ lineHeight: `${+height * .9}px` }}
        >
          {title}
        </h3>
        <div className={buildClasses(['header__links'])}>
          {loggedIn && this.renderLinks(loggedInLinks)}
          {!loggedIn && this.renderLinks(notLoggedInLinks)}
        </div>
      </header>
    );
  }
}

SexyHeader.propTypes = {
  height: number,
  history: object,
  loggedIn: bool,
  loggedInLinks: array,
  notLoggedInLinks: array,
  title: string,
};

export default withRouter(SexyHeader);
