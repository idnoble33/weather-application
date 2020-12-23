import React from "react";
import "./nav.css";
import Home from "../pages/home";
import Weather from "../pages/weather";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    main: (props) => <Home {...props} />,
  },
  {
    path: "/weather",
    main: (props) => {
      return <Weather {...props} />;
    },
  },
];

export default function Nav(props) {
  return (
    <Router>
      <div className="container">
        <div className="sidebar_container">
          <ul className="sidebar">
            <li className="navbar__link--active" className="navbar__link">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar__link--active" className="navbar__link">
              <Link to="/weather">Weather</Link>
            </li>
          </ul>
        </div>
        <div className="page_container">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main apiKey={props.apiKey} />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}
