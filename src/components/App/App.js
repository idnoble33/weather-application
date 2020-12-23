import Nav from "../nav/nav";
import "./App.css";
import React from "react";

export default function App(props) {
  return (
    <div className="App">
      <Nav apiKey={props.apiKey} />
    </div>
  );
}
