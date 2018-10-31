import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Homepage from './Homepage';
import Banner from './components/Banner';
import Navbar from './components/Navbar';

class Routes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/banner" component={Banner} />
        <Route exact path="/navbar" component={Navbar} />

        {/* <Route exact path="/contact" component={Contact} /> */}
      </Switch>
    )
  }

}

export default withRouter(Routes);






