import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Demos from "./pages/Demos";
import DemoScript from "./pages/DemoScript";
import Settings from "./pages/Settings";
import SalesTeam from "./pages/SalesTeam";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/demoscript" component={DemoScript} />
          <Route path="/customers" component={Customers} />
          <Route path="/salesteam" component={SalesTeam} />
          <Route path="/demos" component={Demos} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
