// @flow
import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { array, number, object, string } from 'prop-types'
import styled from 'react-emotion'

import { breakpoints, colors, shadows } from '../../../../styles'

import SexyHeaderTitle from './Title'

type Props = {
  headerHeight?: number,
  history: Object,
  links?: any[],
  title: string,
}

const DEFAULT_HEIGHT = 50

const StyledHeader = styled('header')`
  ${shadows.med};

  align-items: center;
  background: ${colors.headerMain};
  color: white;
  display: flex;
  height: ${props => props.headerHeight || DEFAULT_HEIGHT}px;
  left: 0;
  padding-left: 10px;
  position: absolute;
  top: 0;
  width: 100%;
`

const StyledLinks = styled('div')`
  align-items: center;
  display: none;
  height: 100%;
  margin-left: 10px;

  @media only screen and (min-width: ${breakpoints.small}) {
    & {
      display: flex;
    }
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 10px;

  &,
  &:active,
  &:hover,
  &:visited {
    color: white;
    text-decoration: none;
  }

  & + & {
    margin-left: 10px;
  }

  &.active {
    background-color: ${colors.headerLight};
  }
`

class SexyHeader extends React.Component<Props> {
  static propTypes = {
    headerHeight: number,
    history: object,
    links: array,
    title: string,
  }

  static Title = SexyHeaderTitle

  isActiveLink(linkTo: string) {
    return this.props.history.location.pathname === linkTo
  }

  renderLinks(links?: any[] = []) {
    return links.map((link: any) => (
      <StyledLink
        className={this.isActiveLink(link.to) ? 'active' : null}
        key={link.to}
        to={link.to}
      >
        {link.text}
      </StyledLink>
    ))
  }

  render() {
    const { headerHeight = DEFAULT_HEIGHT, links, title } = this.props
    return (
      <StyledHeader headerHeight={headerHeight}>
        <SexyHeader.Title
          headerHeight={headerHeight}
          title={title}
        />
        <StyledLinks>{this.renderLinks(links)}</StyledLinks>
      </StyledHeader>
    )
  }
}

export default withRouter(SexyHeader)
