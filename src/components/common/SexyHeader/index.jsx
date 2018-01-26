// @flow
import React from 'react';
import { number, string } from 'prop-types';

import { buildClasses } from '../../../utils/cssHelpers';

import './styles.css';

type Props = {
  height?: number,
  title: string,
};

const styles = (props: Props) => ({
  height: props.height || 50,
});

class SexyHeader extends React.Component<Props> {
  render() {
    const {
      title,
    } = this.props;

    return (
      <header
        className={buildClasses(['header'])}
        style={styles(this.props)}
      >
        <h3>{title}</h3>
      </header>
    );
  }
}

SexyHeader.propTypes = {
  height: number,
  title: string,
};

export default SexyHeader;
