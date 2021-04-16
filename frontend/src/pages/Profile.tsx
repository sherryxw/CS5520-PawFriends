// https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#get-an-access-token
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Box, Grid, Button, TextField } from "@material-ui/core";
import AuthInfo from "src/pages/components/AuthUtil";

const axios = require("axios").default;

const Profile = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  const [newName, setUsername] = useState("");
  const [newNumber, setPhoneNumber] = useState("");

  var userInfo = {
    email: "",
    user_name: "",
    phone_number: "",
    role: "",
  };

  if (userInfo.email === "") {
    userInfo = AuthInfo();
  }

  if (newName !== "") {
    userInfo.user_name = newName;
  }

  if (newNumber !== "") {
    userInfo.phone_number = newNumber;
  }

  // https://auth0.com/docs/users/update-metadata-with-the-management-api
  const updateProfile = async () => {
    if (newName.length < 6) {
      alert("Username must be at least has a length of 6. Please try again.");
      return;
    }
    if (newNumber.length !== 10 || isNaN(+newNumber)) {
      alert(
        "Phone number must be 10 digits and contain no special characters. Please try again."
      );
      return;
    }

    // send a PATCH request to Auth0 Management API
    // https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#get-an-access-token
    const domain =
      process.env.REACT_APP_AUTH0_DOMAIN || "dev-nweoxfrl.us.auth0.com";

    var accessToken = null;
    try {
      accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "update:current_user_metadata",
      });
    } catch (e) {
      accessToken = await getAccessTokenWithPopup({
        audience: `https://${domain}/api/v2/`,
        scope: "update:current_user_metadata",
      });
    }

    var options = {
      method: "PATCH",
      url: `https://${domain}/api/v2/users/${user.sub}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      data: { user_metadata: { user_name: newName, phone_number: newNumber } },
    };

    axios
      .request(options)
      .then(function (response: any) {
        console.log(response.data);
        alert("Information has been updated successfully!");
      })
      .catch(function (error: any) {
        console.error(error);
        alert("Something goes wrong. Please try again later.");
      });
  };

  var currentDate = new Date();
  var hrs = currentDate.getHours();
  var greeting;
  if (hrs < 12) {
    greeting = "Good Morning!";
  } else if (hrs >= 12 && hrs <= 17) {
    greeting = "Good Afternoon!";
  } else if (hrs > 17 && hrs <= 24) {
    greeting = "Good Evening!";
  }

  return (
    isAuthenticated && (
      <Container maxWidth='md'>
        <h2>{greeting}</h2>
        <Box component='span' display='block'>
          <h4>Edit Your Profile</h4>
          <form>
            <Grid
              item
              container
              direction='column'
              alignItems='center'
              justify='center'
              xs={8}
            >
              <TextField
                disabled
                id='email-disabled'
                label='Email'
                variant='filled'
                margin='dense'
                fullWidth
                value={userInfo.email}
              />
              <TextField
                required
                id='username-required'
                label='Username'
                fullWidth
                value={userInfo.user_name}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                required
                id='phone-required'
                label='Phone number'
                fullWidth
                value={userInfo.phone_number}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <TextField
                disabled
                id='role-disabled'
                variant='filled'
                label='Role'
                margin='dense'
                fullWidth
                value={userInfo.role}
                helperText='You need to register another account if you want to switch roles'
              />
            </Grid>
            <Button
              variant='contained'
              color='primary'
              onClick={() => updateProfile()}
            >
              Update
            </Button>
          </form>
        </Box>
      </Container>
    )
  );
};

export default Profile;
