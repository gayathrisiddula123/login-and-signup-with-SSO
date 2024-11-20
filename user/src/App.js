import React, { useState, useEffect } from 'react';

import jwt_decode from "jwt-decode";

import Signup from './Components/Signup';
import Login from './Components/Login';
import GoogleSignIn from './Components/GoogleSignIn';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
    const [userName, setUserName] = useState(localStorage.getItem("userName") || '');

    const handleCallbackResponse = (response) => {
        const userObject = jwt_decode(response.credential);

        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const isUserRegistered = registeredUsers.includes(userObject.email);

        if (isUserRegistered) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userName", userObject.name);
            setUserName(userObject.name);
            setIsLoggedIn(true);
            console.log("User logged in:", { name: userObject.name, email: userObject.email });
            console.log("LocalStorage after login:", localStorage);
        } else {
            alert("Please sign up before logging in.");
            console.log("Login attempt by unregistered user:", userObject.email);
        }
    };

    const handleSignup = (email) => {
        // Save the email of the signed-up user
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        if (!registeredUsers.includes(email)) {
            registeredUsers.push(email);
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            console.log("User signed up:", email);
            console.log("LocalStorage after signup:", localStorage);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userName");
        setUserName('');
        setIsLoggedIn(false);
        console.log("User logged out");
        console.log("LocalStorage after logout:", localStorage);
    };

    useEffect(() => {
        const loadGoogleSignIn = () => {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            document.body.appendChild(script);
        };
        loadGoogleSignIn();

        // Log initial localStorage values
        console.log("Initial LocalStorage:", localStorage);
    }, []);

    return (
        <div className="App">
            <h1>App</h1>
            {isLoggedIn ? (
                <div className="welcome-message">
                    <p>Welcome, {userName}! You are logged in.</p>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="signup-login-container">
                    <Signup onSignup={handleSignup} />
                    <Login />
                    <GoogleSignIn handleCallbackResponse={handleCallbackResponse} />
                </div>
            )}
        </div>
    );
};

export default App;
