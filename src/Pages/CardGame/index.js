import React, { useState } from 'react';
import './index.css';

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function generateDeck() {
  return ranks.flatMap(rank => suits.map(suit => ({ rank, suit })));
}

function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Card({ card, index, totalCards }) {
   console.log("card",card)
  const isRed = card.suit === '♥' || card.suit === '♦';
  
  // Calculate spread and rotation based on position in hand
  const maxRotation = 15;
  const maxSpread = 220;
  const rotation = -maxRotation + (2 * maxRotation / (totalCards - 1)) * index;
  const xOffset = -maxSpread + (2 * maxSpread / (totalCards - 1)) * index;

  return (
    <div 
      className={`card ${isRed ? 'red' : 'black'}`}
      style={{
        '--rotation': `${rotation}deg`,
        '--x-offset': `${xOffset}px`,
        '--z-index': index,
        '--delay': `${index * 0.05}s`
      }}
    >
      <div className="card-corner top-left">
        <div>{card.rank}</div>
        <div>{card.suit}</div>
      </div>
      <div className="card-center">{card.suit}</div>
      <div className="card-corner bottom-right">
        <div>{card.rank}</div>
        <div>{card.suit}xxxxx</div>
      </div>
    </div>
  );
}

export default function CardGame() {
  const [deck, setDeck] = useState(shuffleDeck(generateDeck()));
  const [drawnCards, setDrawnCards] = useState([]);

  const drawCard = () => {
    if (deck.length === 0) return;
    setDrawnCards([...drawnCards, deck[0]]); // Add to end for better fanning
    setDeck(prev => prev.slice(1));
  };

  const resetDeck = () => {
    setDrawnCards([]);
    setDeck(shuffleDeck(generateDeck()));
  };

  return (
    <div className="card-game-container">
      <h1>Poker Hand Simulator</h1>
      
      <div className="controls">
        <button onClick={drawCard} disabled={deck.length === 45}>
          Draw Card
        </button>
        <button onClick={resetDeck}>Reset Deck</button>
        <div className="counter">Cards Remaining: {deck.length}</div>
      </div>

      <div className="hand-container">
        <div className="card-stack">
          {drawnCards.map((card, index) => (
            <Card 
              key={index} 
              card={card} 
              index={index}
              totalCards={drawnCards.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
