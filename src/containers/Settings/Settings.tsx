import React, { Component } from 'react';
import IReduxState from '../../interfaces/IReduxState';
import { connect } from 'react-redux';
import './Settings.scss';

class Settings extends Component {
  render() {
    return (
      <section className="settings-container">
        this is setting page shows react router works
      </section>
    );
  }
}

export default connect()(Settings);
