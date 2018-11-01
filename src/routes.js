import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Homepage from './Homepage';
import Profile from './components/Profile/Profile';
import PropertySearch from './components/PropertySearch/PropertySearch';

class Routes extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/propertysearch" component={PropertySearch} />
        {/* <Route exact path="/contact" component={Contact} /> */}
      </Switch>
    )
  }

}

export default withRouter(Routes);






