import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#get-an-access-token
const AuthInfo = () => {
  const { user, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [userInfo, setUserInfo] = useState({
    email: "",
    user_id: "",
    user_name: "",
    phone_number: "",
    role: "",
  });

  // use useEffect() to prevent re-rendering in an infinite loop
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
      var accessToken = null;

      // https://github.com/auth0/auth0-react/issues/65
      try {
        accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
      } catch (e) {
        accessToken = await getAccessTokenWithPopup({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
      }

      try {
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();
        const user_info = {
          email: user.email,
          user_id: user.sub,
          user_name: user_metadata.user_name,
          phone_number: user_metadata.phone_number,
          role: user_metadata.role,
        };
        setUserInfo(user_info);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [user.email, user.sub, getAccessTokenSilently, getAccessTokenWithPopup]);

  return userInfo;
};

export default AuthInfo;
