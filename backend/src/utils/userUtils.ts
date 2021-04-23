// https://auth0.com/docs/users/user-search/retrieve-users-with-get-users-endpoint

import axios from "axios";
const domain = process.env.AUTH0_DOMAIN || "";
const api_token = process.env.AUTH0_API_TOKEN || "";

interface UserMetadata {
  user_name: string;
  phone_number: string;
  role: "BUYER" | "DEALER";
}

// given a single user_id, return its user_metadata
// example:
// getUserMetadate("auth0|607badd0c9c93e006b8108be").then((result: any) => {console.log(result);});
// result:
// { user_name: 'DealerY', phone_number: '1230009999', role: 'DEALER' }
function getUserMetadate(input_user_id: string) {
  var options: any = {
    method: "GET",
    url: `https://${domain}/api/v2/users`,
    params: { q: `user_id: ${input_user_id}`, search_engine: "v3" },
    headers: { authorization: `Bearer ${api_token}` },
  };
  return axios.request(options).then(function (response: any) {
    return response.data[0].user_metadata as UserMetadata;
  });
}

export default getUserMetadate;
