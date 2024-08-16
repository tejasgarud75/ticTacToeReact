import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ leaderboard }) => {
    return (
        <div className="leaderboard">
            <h3>Top Winners</h3>
            <ul>
                {leaderboard.map(user => (
                    <li key={user.id}>{user.name} : {user.wins} wins </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
