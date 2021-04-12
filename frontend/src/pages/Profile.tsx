import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile(): JSX.Element {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <h1>Profile here</h1>
            {console.log(user)}
            {
                isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                )
            }
            {
                ! isAuthenticated && (
                    <div>
                        <h2>Authentication Failed</h2>
                    </div>
                )
            }
        </>


    );
};

export default Profile;
