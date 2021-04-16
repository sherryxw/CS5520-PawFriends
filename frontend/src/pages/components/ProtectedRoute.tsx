import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Example from "src/pages/example";

// Profile should be a private route in App.tsx
// temporarily redirect to Example if not logged in, will change later
const ProtectedRoute = ({ component, ...args }: any) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Example />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
