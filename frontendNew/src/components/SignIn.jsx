import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            localStorage.setItem('user', JSON.stringify(response.data));
            //navigate('/profile');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
      <header className="header-gif">
      </header>
        <div className="form-container">
            <form onSubmit={handleLogin} className="form-box">
                <h2 className="form-title">Sign In</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="form-input"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="form-button">Login</button>
            </form>
        </div>
        </div>
    );
}

export default SignIn;
