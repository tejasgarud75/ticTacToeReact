import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = ({ user }) => {
    const [game, setGame] = useState(null);

    useEffect(() => {
        if (game && game.result) {
            // Alert based on the game result
            switch (game.result) {
                case 'WIN':
                    alert('Congratulations, you won!');
                    break;
                case 'DRAW':
                    alert('The game is a draw!');
                    break;
                case 'LOSS':
                    alert('Sorry, you lost. Better luck next time!');
                    break;
                default:
                    break;
            }
            // Optionally, reset game state or perform any other actions
            setGame(null);
        }
    }, [game]);

    const handleStartGame = async () => {
        const response = await fetch(`http://localhost:8081/api/game/start?email=${user.email}`, {
            method: 'POST',
        });
        const newGame = await response.json();
        setGame(newGame);
    };

    const handleMove = async (position) => {
        const response = await fetch(`http://localhost:8081/api/game/move?gameId=${game.id}&position=${position}`, {
            method: 'POST',
        });
        const updatedGame = await response.json();
        setGame(updatedGame);
    };

    return (
        <div className="game-page">
            {game ? (
                <div className="game-board">
                    {game.boardState.split('').map((cell, index) => (
                        <div 
                            key={index} 
                            className="cell"
                            onClick={() => handleMove(index)}
                        >
                            {cell}
                        </div>
                    ))}
                </div>
            ) : (
                <button onClick={handleStartGame}>Start Game</button>
            )}
        </div>
    );
};

export default Game;
