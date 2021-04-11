import React from "react";
import { Button } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import Example from "src/pages/example";

const App = () => {
  const history = useHistory();

  return (
    <div>
      <Switch>
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
        </Route>
      </Switch>
    </div>
  );
};

export default App;
