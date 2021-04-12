import React from 'react';
import { Route } from 'react-router-dom';

import './AppContainer.scss';
import DashboardContainer from './DashboardContainer/DashboardContainer';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import NavigationBar from './NavigationBar/NavigationBar';
import Settings from './Settings/Settings';

const AppContainer = () => {
  return (
    <main className="app-container">
      <Header />
      <NavigationBar />
      <Route path="/" exact={true} component={DashboardContainer} />
      <Route path="/settings" component={Settings} />
      <Footer />
    </main>
  );
};

export default AppContainer;
