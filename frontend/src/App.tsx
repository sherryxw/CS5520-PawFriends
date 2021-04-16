import React from "react";
import { Button } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import Example from "src/pages/example";
import Profile from "./pages/Profile";
import NavbarComponent from "./pages/NavbarComponent";
import "bootstrap/dist/css/bootstrap.css";
import Employees from "./pages/Demand/Employees.js";

const App = () => {
  const history = useHistory();

  return (
    <div>
      <NavbarComponent />
      <Switch>
        <Route path='/profile/:userId' exact component={Profile} />
        <Route exact path='/example'>
          <Example />
        </Route>
        <Route path='/'>
          hello world
          <br />
          <Button
            variant='outlined'
            onClick={() => {
              history.push("/example");
            }}
          >
            Jump to example page
          </Button>
          <Route exact path='/Demand'>
            <Employees />
          </Route>
          <Route path='/'>
            <br />
            <Button
              variant='outlined'
              onClick={() => {
                history.push("/Demand");
              }}
            >
              Match page
            </Button>
          </Route>
        </Route>
      </Switch>
    </div>
  );
};

export default App;

