import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Components/Layout";
// import App from "./Components/App";
import Analysis from "./Components/Analysis";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
// import * as serviceWorker from './serviceWorker';

const renderApp = () => (
  <Router>
    <Layout>
      <Switch>
        {/* <Route path="/about" render={props => <App {...props} />} /> */}
        <Route path="/" render={props => <Analysis {...props} />} />
      </Switch>
    </Layout>
  </Router>
);

ReactDOM.render(renderApp(), document.getElementById("root"));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
