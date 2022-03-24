import React, { useState, useEffect } from 'react';

function App() {
  const [isPlay, setIsPlay] = useState(false);
  const [activePlayer, setActivePlayer] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [dice, setDice] = useState({ number: 0 });

  // start game
  const rollDice = () => {
    if (!isGameOver) {
      setIsPlay(true);
      setDice({ number: Math.floor(Math.random() * 6) + 1 });
    }
  };

  useEffect(() => {
    if (dice.number !== 1) {
      new Audio('./sounds/roll.mp3').play();
      setCurrentScore((currentScore) => currentScore + dice.number);
    } else {
      new Audio('./sounds/lose.wav').play();
      setCurrentScore(0);
      activePlayer === 1 ? setActivePlayer(2) : setActivePlayer(1);
    }
  }, [dice]);

  const holdGame = () => {
    if (!isGameOver) {
      new Audio('./sounds/next.wav').play();
      if (activePlayer === 1) {
        if (score1 + currentScore < 100) {
          setScore1((prevScore) => prevScore + currentScore);
          setCurrentScore(0);
          setActivePlayer(2);
        } else {
          new Audio('./sounds/win.wav').play();
          setIsPlay(false);
          setIsGameOver(true);
          setScore1(score1 + currentScore);
        }
      } else {
        if (score2 + currentScore < 100) {
          setScore2((prevScore) => prevScore + currentScore);
          setCurrentScore(0);
          setActivePlayer(1);
        } else {
          new Audio('./sounds/win.wav').play();
          setIsPlay(false);
          setIsGameOver(true);
          setScore2(score2 + currentScore);
        }
      }
    }
  };
  // reset game
  const resetGame = () => {
    new Audio('./sounds/start.wav').play();
    setScore1(0);
    setScore2(0);
    setCurrentScore(0);
    setIsGameOver(false);
    setActivePlayer(1);
  };

  return (
    <main>
      <section
        className={`player player--0 ${
          activePlayer === 1 && isGameOver
            ? 'player--winner '
            : activePlayer === 1 && !isGameOver
            ? 'player--active'
            : null
        }`}
      >
        <h2 className="name" id="name--0">
          Player 1
        </h2>
        <p className="score" id="score--0">
          {score1}
        </p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">
            {activePlayer === 1 ? currentScore : 0}
          </p>
        </div>
      </section>
      <section
        className={`player player--1 ${
          activePlayer === 2 && isGameOver
            ? 'player--winner '
            : activePlayer === 2 && !isGameOver
            ? 'player--active'
            : null
        }`}
      >
        <h2 className="name" id="name--1">
          Player 2
        </h2>
        <p className="score" id="score--1">
          {score2}
        </p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--1">
            {activePlayer === 2 ? currentScore : 0}
          </p>
        </div>
      </section>
      {isPlay && (
        <img
          src={`./images/dice-${dice.number}.png`}
          alt="Playing dice"
          className="dice"
        />
      )}
      <button className="btn btn--new" onClick={resetGame}>
        🔄 New game
      </button>
      <button className="btn btn--roll" onClick={rollDice}>
        🎲 Roll dice
      </button>
      <button className="btn btn--hold" onClick={holdGame}>
        📥 Hold
      </button>
    </main>
  );
}

export default App;
