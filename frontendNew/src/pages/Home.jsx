import React, { useState } from 'react';
//import './App.css'; // Import your CSS file
import avatarGif from '../assets/avatar.gif'; // Import your GIF

function App() {
  const [username, setUsername] = useState('');
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState('Bronze');
  const [badges, setBadges] = useState(0);
  const [streak, setStreak] = useState(1);

  return (
    <div className="homep">
      <header>
        <h1>LearnFun</h1>
        <nav>
          <ul>
            <li>Learn</li>
            <li>Practice</li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="welcome-message">
          <p >Welcome back warrior! Let's get it.</p>
        </div>

        <div className="progress">
          <h2>My Progress</h2>
          <div className="user-info">
            <img src={avatarGif}  alt="Avatar"/>
            <div>
              <p>{username}</p>
              <p>Level {level}</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <p>Total XP</p>
              <p>{xp}</p>
            </div>
            <div className="stat">
              <p>Rank</p>
              <p>{rank}</p>
            </div>
            <div className="stat">
              <p>Badges</p>
              <p>{badges}</p>
            </div>
          </div>

          <div className="Myprofile">My Profile</div>
        </div>

        
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;