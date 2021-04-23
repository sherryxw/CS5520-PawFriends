import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Home from "src/pages/home";

// Profile should be a private route in App.tsx
const ProtectedRoute = ({ component, ...args }: any) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Home />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
