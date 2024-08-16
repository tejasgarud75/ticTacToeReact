import React, { useState, useEffect } from 'react';
import './Login.css';
import Leaderboard from '../Leaderboard/Leaderboard';

const Login = ({ user, onStartGame }) => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/api/game/leaderboard')
            .then(response => response.json())
            .then(data => setLeaderboard(data));
    }, []);

    return (
        <div className="login-page">
            <h2>Welcome, {user.name}</h2>
            <Leaderboard leaderboard={leaderboard} />
            <button onClick={onStartGame}>Start New Game </button>
        </div>
    );
};

export default Login;