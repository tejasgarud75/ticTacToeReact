import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Game from './components/Game/Game';

function App() {
    const [user, setUser] = useState(null);
    const [inGame, setInGame] = useState(false);

    const handleLogin = (user) => {
        setUser(user);
    };

    const handleStartGame = () => {
        setInGame(true);
    };

    return (
        <div className="App">
            {!user ? (
                <LandingPage onLogin={handleLogin} />
            ) : !inGame ? (
                <Login user={user} onStartGame={handleStartGame} />
            ) : (
                <Game user={user} />
            )}
        </div>
    );
}

export default App;