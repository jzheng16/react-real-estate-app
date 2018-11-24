import { Route, Switch, withRouter } from "react-router-dom";
import React, { Component } from "react";
import Homepage from "./components/Homepage/Homepage";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import UserSavedProperties from "./components/UserSavedProperties/UserSavedProperties";

import Profile from "./components/Profile/Profile";
import PropertySearch from "./components/PropertySearch/PropertySearch";

class Routes extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/propertysearch" component={PropertySearch} />
        <Route
          exact
          path="/UserSavedProperties"
          component={UserSavedProperties}
        />

        {/* <Route exact path="/contact" component={Contact} /> */}
      </Switch>
    );
  }
}

export default withRouter(Routes);
