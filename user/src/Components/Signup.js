// src/components/Signup.js
import React, { useState } from 'react';
import '../App.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    
        
    const handleSignUp = () => {
        if (!email || !password || !confirmPassword) {
            setMessage("Invalid: All fields are required!");
            setIsSuccess(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            setIsSuccess(false);
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem("user"));
        if (existingUser && existingUser.email === email) {
            setMessage("User already exists. Please login.");
            setIsSuccess(false);
        } else {
            localStorage.setItem("user", JSON.stringify({ email, password }));
            setMessage("Sign-up successful! You can now log in.");
            setIsSuccess(true);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            {message && (
                <p className={isSuccess ? "success-message" : "error-message"}>{message}</p>
            )}
        </div>
    );
};

export default SignUp;