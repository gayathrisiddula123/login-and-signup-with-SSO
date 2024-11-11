import React, { useEffect } from 'react';

const GoogleSignIn = ({ handleCallbackResponse }) => {
    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                
                client_id: "492267953637-dnaosdr84aeqvr3pict5jks3jvr1aneq.apps.googleusercontent.com",
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
