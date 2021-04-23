// https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#get-an-access-token
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Box, Grid, Button, TextField } from "@material-ui/core";
import useAuthInfo from "src/pages/components/AuthUtil";

const axios = require("axios").default;

const Profile = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  var userInfo = useAuthInfo();

  // created to force re-render
  const [refresh, setRefresh] = useState(0);

  // https://auth0.com/docs/users/update-metadata-with-the-management-api
  const updateProfile = async () => {
    if (userInfo.user_name.length < 6) {
      alert("Username must be at least has a length of 6. Please try again.");
      return;
    }
    if (userInfo.phone_number.length !== 10 || isNaN(+userInfo.phone_number)) {
      alert(
        "Phone number must be 10 digits and contain no special characters. Please try again."
      );
      return;
    }
    // send a PATCH request to Auth0 Management API
    // https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#get-an-access-token
    const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
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
      data: {
        user_metadata: {
          user_name: userInfo.user_name,
          phone_number: userInfo.phone_number,
        },
      },
    };
    axios
      .request(options)
      .then(function (response: any) {
        alert("Information has been updated successfully!");
      })
      .catch(function (error: any) {
        console.error(error);
        alert("Something goes wrong. Please try again later.");
      });
  };

  function updateUserName(newName: string) {
    userInfo.user_name = newName;
    const newrefresh = refresh + 1;
    setRefresh(newrefresh);
  }

  function updatePhoneNumber(newNumber: string) {
    userInfo.phone_number = newNumber;
    const newrefresh = refresh + 1;
    setRefresh(newrefresh);
  }

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
                onChange={(event) => updateUserName(event.target.value)}
              />
              <TextField
                required
                id='phone-required'
                label='Phone number'
                fullWidth
                value={userInfo.phone_number}
                onChange={(event) => updatePhoneNumber(event.target.value)}
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
