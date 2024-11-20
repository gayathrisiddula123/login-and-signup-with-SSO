import React, { useState } from 'react';

import '../App.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            setMessage("Invalid: All fields are required!");
            setIsSuccess(false);
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email === email && user.password === password) {
            localStorage.setItem("loggedIn", "true");
            setMessage("Login successful!");
            setIsSuccess(true);
        } else {
            setMessage("Invalid email or password.");
            setIsSuccess(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
            {message && (
                <p className={isSuccess ? "success-message" : "error-message"}>{message}</p>
            )}
        </div>
    );
};

export default Login;