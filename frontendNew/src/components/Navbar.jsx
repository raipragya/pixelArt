import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/lessons">Lessons</Link>
            <Link to="/gamification">Gamification</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/signin">Sign In</Link>
        </nav>
    );
}

export default Navbar;
