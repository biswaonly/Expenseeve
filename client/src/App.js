import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import "./App.css";
import LeftPanel from "./components/leftPanel/LeftPanel";
import Home from "./components/home/Home";
import Settings from "./components/settings/Settings";
import Profile from "./components/profile/Profile";
import Header from "./components/header/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/header/Alert";
import { loadUser } from "./actions/auth";

const App = () => {
  useEffect(() => {
    console.log("COMPONENT DID MOUNT");
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="sup_cont">
            <LeftPanel />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/settings" component={Settings} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </section>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
