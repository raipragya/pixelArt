import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import "./App.css";
import Lesson from './components/Lesson';

function App() {
    return (

        
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/userProfile" element={<UserProfile/>}/>
                    <Route path="/Lessons" element={<Lesson/>}/>
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/SignIn" element={<SignIn />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
