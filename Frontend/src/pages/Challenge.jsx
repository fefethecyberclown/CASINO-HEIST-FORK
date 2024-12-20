import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css'; // Import the CSS file

// Import all art assets
import briefingArt from '../assets/Properties/blockchain-briefing/art.png';
import gearingupArt from '../assets/Properties/blockchain-gearing-up/art.png';
import cheapglitchArt from '../assets/Properties/blockchain-cheap-glitch/art.png';
import entrypointArt from '../assets/Properties/blockchain-entry-point/art.png';
import barArt from '../assets/Properties/blockchain-bar/art.png';
import rouletteArt from '../assets/Properties/blockchain-roulette/art.png';
import blackjackArt from '../assets/Properties/blockchain-master-of-blackjack/art.png';
import votingfrenzyArt from '../assets/Properties/blockchain-voting-frenzy/art.png';
import vvvipmemberArt from '../assets/Properties/blockchain-vvvip-member/art.png';
import injubankArt from '../assets/Properties/blockchain-inju-bank/art.png';
import silentDealerArt from '../assets/Properties/blockchain-silent-dealer/art.png';
import singularentityArt from '../assets/Properties/blockchain-singular-entity/art.png';
import unlimitedCreditArt from '../assets/Properties/blockchain-unlimited-credit-line/art.png';
import symbolofnobleArt from '../assets/Properties/blockchain-symbol-of-noble/art.png';
import casinovaultArt from '../assets/Properties/blockchain-casino-vault/art.png';
import injusgambitArt from '../assets/Properties/blockchain-injus-gambit/art.png';
import casinobankbusterArt from '../assets/Properties/blockchain-casino-bankbuster/art.png';
import executiveproblemsArt from '../assets/Properties/blockchain-executive-problems/art.png';
import doubleornothingArt from '../assets/Properties/blockchain-double-or-nothing/art.png';

import ethereumFeature from "../assets/images/ethereum-coins.png";

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const apiURL = import.meta.env.VITE_BACKEND_IP; // Use the API URL from environment variable

  // Map of challenge codes to corresponding images
  const challengeArtMap = {
    'blockchain-briefing': briefingArt,
    'blockchain-gearing-up': gearingupArt,
    'blockchain-cheap-glitch': cheapglitchArt,
    'blockchain-entry-point': entrypointArt,
    'blockchain-bar': barArt,
    'blockchain-roulette': rouletteArt,
    'blockchain-master-of-blackjack': blackjackArt,
    'blockchain-voting-frenzy': votingfrenzyArt,
    'blockchain-vvvip-member': vvvipmemberArt,
    'blockchain-inju-bank': injubankArt,
    'blockchain-silent-dealer': silentDealerArt,
    'blockchain-singular-entity': singularentityArt,
    'blockchain-unlimited-credit-line': unlimitedCreditArt,
    'blockchain-symbol-of-noble': symbolofnobleArt,
    'blockchain-casino-vault': casinovaultArt,
    'blockchain-double-or-nothing': doubleornothingArt,
    'blockchain-injus-gambit': injusgambitArt,
    'blockchain-casino-bankbuster': casinobankbusterArt,
    'blockchain-executive-problems': executiveproblemsArt,
  };

  useEffect(() => {
    fetch(`${apiURL}/Challenge`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setChallenges(data);
      })
      .catch((error) => console.error('Error fetching challenges:', error));
  }, []);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'basic':
        return 'challenge-box-basic';
      case 'common':
        return 'challenge-box-common';
      case 'vip':
        return 'challenge-box-vip';
      default:
        return 'challenge-box';
    }
  };

  const handleChallengeClick = (challengeCode) => {
    navigate(`/heist/${challengeCode}`); // Redirect to Heist with challengeCode
  };

  return (
    <div className="challenge-container">
      <h1>Challenges</h1>
      <div className="challenge-grid">
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <div
              className={getDifficultyClass(challenge.challengeDifficulty)}
              key={challenge.challengeId}
              onClick={() => handleChallengeClick(challenge.challengeCode)}
            >
              <img
                src={challengeArtMap[challenge.challengeCode] || ethereumFeature} // Fallback to ethereumFeature if no image found
                alt={challenge.challengeName}
                className="challenge-icon"
              />
              <p className='challenge-tag'>{challenge.challengeTag}</p>
            </div>
          ))
        ) : (
          <p>Loading challenges...</p>
        )}
      </div>
    </div>
  );
};

export default Challenge;
