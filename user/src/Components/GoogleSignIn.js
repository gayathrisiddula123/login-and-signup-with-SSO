import React, { useEffect } from 'react';

const GoogleSignIn = ({ handleCallbackResponse }) => {
    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: "492267953637-mn4e98fd4umrjq5d8kdcc3o8u9kbfu8o.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            });
            window.google.accounts.id.renderButton(
                document.getElementById("googleSignInButton"),
                { theme: "outline", size: "large" }
            );
        }
    }, [handleCallbackResponse]);

    return <div id="googleSignInButton"></div>;
};

export default GoogleSignIn;
