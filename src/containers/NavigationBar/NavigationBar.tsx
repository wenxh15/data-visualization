import React, { Component } from 'react';
import IReduxState from '../../interfaces/IReduxState';
import { connect } from 'react-redux';
import './NavigationBar.scss';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

interface INavigationBarState {
  isMinimized: boolean;
  menu: IMenuItem[];
}

interface IMenuItem {
  text: string;
  link: string;
}

enum menuText {
  home = 'Home',
  settings = 'Settings'
}

class NavigationBar extends Component {
  state: INavigationBarState = {
    isMinimized: false,
    menu: [
      {
        text: menuText.home,
        link: '/'
      },
      {
        text: menuText.settings,
        link: '/settings'
      }
    ]
  };

  toggleCollasp = () => {
    this.setState({ isMinimized: !this.state.isMinimized });
  };
  getContainerCSSClass = () => {
    return !this.state.isMinimized
      ? 'menu-container'
      : 'menu-container menu-container--invisible';
  };
  render() {
    const { menu } = this.state;
    return (
      <nav className="navigation-bar">
        <ul className={this.getContainerCSSClass()}>
          <div className="icon" onClick={this.toggleCollasp}>
            <i className="fa fa-bars"></i>
          </div>
          {menu.map((menuItem: IMenuItem, i: number) => (
            <li key={'menuItem' + i} className="menu-item">
              <Link className="menu-item-link" to={menuItem.link}>
                {menuItem.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default connect()(NavigationBar);
