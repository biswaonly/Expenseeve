import * as React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import Register from "./components/auth/Register";
import Alert from "./components/common/Alert";
import Login from "./components/auth/Login";
import { loadUser } from "./actions/auth";
import Header from "./components/common/Header";
import LeftPanel from "./components/common/LeftPanel";
import Home from "./components/home/Home";
import Settings from "./components/settings/Settings";
import Profile from "./components/profile/Profile";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";
import TimerAlert from "./components/common/TimerAlert";

function App() {
  useEffect(() => {
    console.log("COMPONENT DID MOUNT");
    store.dispatch(loadUser() as any);
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
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/" component={Home} />
                <Route path="/settings" component={Settings} />
                <Route path="/profile" component={Profile} />
              </Switch>
              <TimerAlert />
            </section>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
