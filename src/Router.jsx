import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PlanJourney from './pages/PlanJourney';

export default function AppController() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/plan' exact component={PlanJourney} />
      </Switch>
    </Router>
  );
}
