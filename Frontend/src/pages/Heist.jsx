import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // Use Prism or other themes
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style
import remarkGfm from 'remark-gfm'; // For GitHub-flavored markdown
import rehypeRaw from 'rehype-raw'

// Import all markdown files 
import briefingMarkdown from '../assets/Properties/blockchain-briefing/text.md';
import gearingupMarkdown from '../assets/Properties/blockchain-gearing-up/text.md';
import cheapglitchMarkdown from '../assets/Properties/blockchain-cheap-glitch/text.md';
import entrypointMarkdown from '../assets/Properties/blockchain-entry-point/text.md';
import barMarkdown from '../assets/Properties/blockchain-bar/text.md';
import rouletteMarkdown from '../assets/Properties/blockchain-roulette/text.md';
import blackjackMarkdown from '../assets/Properties/blockchain-master-of-blackjack/text.md';
import votingfrenzyMarkdown from '../assets/Properties/blockchain-voting-frenzy/text.md';
import vvvipmemberMarkdown from '../assets/Properties/blockchain-vvvip-member/text.md';
import injubankMarkdown from '../assets/Properties/blockchain-inju-bank/text.md';
import silentDealerMarkdown from '../assets/Properties/blockchain-silent-dealer/text.md';
import singularentityMarkdown from '../assets/Properties/blockchain-singular-entity/text.md';
import unlimitedCreditMarkdown from '../assets/Properties/blockchain-unlimited-credit-line/text.md';
import symbolofnobleMarkdown from '../assets/Properties/blockchain-symbol-of-noble/text.md';
import doubleornothingMarkdown from '../assets/Properties/blockchain-double-or-nothing/text.md';
import injusgambitMarkdown from '../assets/Properties/blockchain-injus-gambit/text.md';
import casinobankbusterMarkdown from '../assets/Properties/blockchain-casino-bankbuster/text.md';
import executiveproblemsMarkdown from '../assets/Properties/blockchain-executive-problems/text.md';
import casinovaultMarkdown from "../assets/Properties/blockchain-casino-vault/text.md";

// import all mitigation files
import cheapglitchMitigation from '../assets/Properties/blockchain-cheap-glitch/mitigation.md';
import entrypointMitigation from '../assets/Properties/blockchain-entry-point/mitigation.md';
import barMitigation from '../assets/Properties/blockchain-bar/mitigation.md';
import rouletteMitigation from '../assets/Properties/blockchain-roulette/mitigation.md';
import blackjackMitigation from '../assets/Properties/blockchain-master-of-blackjack/mitigation.md';
import votingfrenzyMitigation from '../assets/Properties/blockchain-voting-frenzy/mitigation.md';
import vvvipmemberMitigation from '../assets/Properties/blockchain-vvvip-member/mitigation.md';
import injubankMitigation from '../assets/Properties/blockchain-inju-bank/mitigation.md';
import silentDealerMitigation from '../assets/Properties/blockchain-silent-dealer/mitigation.md';
import singularentityMitigation from '../assets/Properties/blockchain-singular-entity/mitigation.md';
import unlimitedCreditMitigation from '../assets/Properties/blockchain-unlimited-credit-line/mitigation.md';
import symbolofnobleMitigation from '../assets/Properties/blockchain-symbol-of-noble/mitigation.md';
import casinovaultMitigation from "../assets/Properties/blockchain-casino-vault/mitigation.md";

// import all description for challenge files
import briefingDescription from '../assets/Properties/blockchain-briefing/description.md';
import gearingupDescription from '../assets/Properties/blockchain-gearing-up/description.md';
import cheapglitchDescription from '../assets/Properties/blockchain-cheap-glitch/description.md';
import entrypointDescription from '../assets/Properties/blockchain-entry-point/description.md';
import barDescription from '../assets/Properties/blockchain-bar/description.md';
import rouletteDescription from '../assets/Properties/blockchain-roulette/description.md';
import blackjackDescription from '../assets/Properties/blockchain-master-of-blackjack/description.md';
import votingfrenzyDescription from '../assets/Properties/blockchain-voting-frenzy/description.md';
import vvvipmemberDescription from '../assets/Properties/blockchain-vvvip-member/description.md';
import injubankDescription from '../assets/Properties/blockchain-inju-bank/description.md';
import silentDealerDescription from '../assets/Properties/blockchain-silent-dealer/description.md';
import singularentityDescription from '../assets/Properties/blockchain-singular-entity/description.md';
import unlimitedCreditDescription from '../assets/Properties/blockchain-unlimited-credit-line/description.md';
import symbolofnobleDescription from '../assets/Properties/blockchain-symbol-of-noble/description.md';
import casinovaultDescription from "../assets/Properties/blockchain-casino-vault/description.md";
import injusgambitDescription from '../assets/Properties/blockchain-injus-gambit/description.md';
import casinobankbusterDescription from '../assets/Properties/blockchain-casino-bankbuster/description.md';
import executiveproblemsDescription from '../assets/Properties/blockchain-executive-problems/description.md';
import doubleornothingDescription from '../assets/Properties/blockchain-double-or-nothing/description.md';

// import downloadable files
const briefingAttachment = "../src/assets/Properties/blockchain-briefing/blockchain-briefing.zip";
const gearingAttachment = "../src/assets/Properties/blockchain-gearing-up/blockchain-gearing-up.zip";
const cheapglitchAttachment = "../src/assets/Properties/blockchain-cheap-glitch/blockchain-cheap-glitch.zip";
const entrypointAttachment = "../src/assets/Properties/blockchain-entry-point/blockchain-entry-point.zip";
const barAttachment = "../src/assets/Properties/blockchain-bar/blockchain-bar.zip";
const rouletteAttachment = "../src/assets/Properties/blockchain-roulette/blockchain-roulette.zip";
const blackjackAttachment = "../src/assets/Properties/blockchain-master-of-blackjack/blockchain-master-of-blackjack.zip";
const votingfrenzyAttachment = "../src/assets/Properties/blockchain-voting-frenzy/blockchain-voting-frenzy.zip";
const vvvipmemberAttachment = "../src/assets/Properties/blockchain-vvvip-member/blockchain-vvvip-member.zip";
const injubankAttachment = "../src/assets/Properties/blockchain-inju-bank/blockchain-inju-bank.zip";
const silentDealerAttachment = "../src/assets/Properties/blockchain-silent-dealer/blockchain-silent-dealer.zip";
const singularentityAttachment = "../src/assets/Properties/blockchain-singular-entity/blockchain-singularity.zip";
const unlimitedCreditAttachment = "../src/assets/Properties/blockchain-unlimited-credit-line/blockchain-unlimited-credit-line.zip";
const symbolofnobleAttachment = "../src/assets/Properties/blockchain-symbol-of-noble/blockchain-symbol-of-noble.zip";
const casinovaultAttachment = "../src/assets/Properties/blockchain-casino-vault/blockchain-casino-vault.zip";
const injusgambitAttachment = "../src/assets/Properties/blockchain-injus-gambit/blockchain-injus-gambit.zip";
const casinobankbusterAttachment = "../src/assets/Properties/blockchain-casino-bankbuster/blockchain-casino-bank-buster.zip";
const executiveproblemsAttachment = "../src/assets/Properties/blockchain-executive-problems/blockchain-executive-problems.zip";
// const doubleornothingAttachment = "../assets/Properties/blockchain-";

// import all art files
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
import casinovaultArt from "../assets/Properties/blockchain-casino-vault/art.png";
import injusgambitArt from '../assets/Properties/blockchain-injus-gambit/art.png';
import casinobankbusterArt from '../assets/Properties/blockchain-casino-bankbuster/art.png';
import executiveproblemsArt from '../assets/Properties/blockchain-executive-problems/art.png';
import doubleornothingArt from '../assets/Properties/blockchain-double-or-nothing/art.png';

// Needed Logos
import downloadLogo from "../assets/images/download.png";
import backgroundImage from "../assets/images/background.jpg";
import hints_1 from "../assets/images/number-1.png";
import hints_2 from "../assets/images/number-2.png";
import hints_3 from "../assets/images/number-3.png";

const Heist = () => {
  const { challengeCode } = useParams();
  const [post, setPost] = useState('');
  const [desc, setDesc] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [mitigation, setMitigation] = useState('');
  const [image, setImage] = useState('');
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState('');
  const [solved, setSolved] = useState(false); // New state for tracking challenge status
  const [flagResult, setFlagResult] = useState(''); // State for displaying flag result text
  const navigate = useNavigate(); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const [hintTopMessage, setTopHintMessage] = useState('');
  const [hintBottomMessage, setBottomHintMessage] = useState('');
  const [isPopupOpenFlag, setIsPopupOpenFlag] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [flagStatus, setFlagStatus] = useState('');
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false); // Confirmation popup
  const [hintNumber, setHintNumber] = useState(null);
  const apiURL = import.meta.env.VITE_BACKEND_IP; // Use the API URL from environment variable


  // Fetch and validate token
  const validateToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const response = await fetch(`${apiURL}/validate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Invalid token');
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  // Fetch challenge status
  const checkChallengeStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(challengeCode)
      const response = await fetch(`${apiURL}/challenge-status/${challengeCode}`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const result = await response.json();
      console.log(result)
      console.log(solved)
      setSolved(result['isSolved'] === 1); // Set solved state based on response
    } catch (error) {
      console.error('Error fetching challenge status:', error);
    }
  };

  // Submit flag with result displayed temporarily
  const handleFlagSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiURL}/verify-flag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ flag, challengeCode }),
      });

      const result = await response.json();
      setFlagResult(result.message); // Store the result message
      if (result.message.includes('is correct!')) {
        setPopupMessage('HEIST COMPLETED!');
        setFlagStatus('flag-popup-overlay-success');
      } else {
        setPopupMessage('HEIST FAILED! WRONG FLAG! RETREAT!');
        setFlagStatus('flag-popup-overlay-failed');
      }

      setIsPopupOpenFlag(true); // Show the popup

      // Hide the popup after 1 second
      setTimeout(() => setIsPopupOpenFlag(false), 1000);

      // Check the challenge status after flag submission
      checkChallengeStatus();
    } catch (error) {
      console.error('Error submitting flag:', error);
    }
  };


  const handleHintClick = async (hintNumber) => {
    setHintNumber(hintNumber);
    setIsConfirmPopupOpen(true);
  };

  const fetchHint = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiURL}/hint/${challengeCode}/${hintNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
      setIsConfirmPopupOpen(false);
      setTopHintMessage(`Hint #${hintNumber}`);
      setHintMessage(`${result['hint']}`); // Set the hint message
      setBottomHintMessage("END OF HINTS---------");
      setIsPopupOpen(true); // Open the popup
    } catch (error) {
      console.error('Error fetching hint:', error);
    }
  };

  const handleConfirmYes = () => {
    fetchHint(); // Proceed to fetch the hint
  };

  const handleConfirmNo = () => {
    setIsConfirmPopupOpen(false); // Close the confirmation popup
  };


  const handleDownload = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No authorization token found");
            return;
        }
    
        // Open the download link in a new window
        const downloadUrl = `${apiURL}/download/${challengeCode}`;
        window.open(downloadUrl, '_blank');
    
    } catch (error) {
        console.error("Error during file download:", error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      validateToken();
      checkChallengeStatus(); // Fetch challenge status on page load
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`${apiURL}/Challenge`)
      .then((response) => response.json())
      .then((challenges) => {
        const selectedChallenge = challenges.find(
          (challenge) => challenge.challengeCode === challengeCode
        );

        if (selectedChallenge) {
          setData(selectedChallenge);

          const markdownMap = {
            'blockchain-briefing': [briefingMarkdown, '', briefingArt, briefingDescription, briefingAttachment],
            'blockchain-gearing-up': [gearingupMarkdown, '', gearingupArt, gearingupDescription, gearingAttachment],
            'blockchain-cheap-glitch': [cheapglitchMarkdown, cheapglitchMitigation, cheapglitchArt, cheapglitchDescription, cheapglitchAttachment],
            'blockchain-entry-point': [entrypointMarkdown, entrypointMitigation, entrypointArt, entrypointDescription, entrypointAttachment],
            'blockchain-bar': [barMarkdown, barMitigation, barArt, barDescription, barAttachment],
            'blockchain-roulette': [rouletteMarkdown, rouletteMitigation, rouletteArt, rouletteDescription, rouletteAttachment],
            'blockchain-master-of-blackjack': [blackjackMarkdown, blackjackMitigation, blackjackArt, blackjackDescription, blackjackAttachment],
            'blockchain-voting-frenzy': [votingfrenzyMarkdown, votingfrenzyMitigation, votingfrenzyArt, votingfrenzyDescription, votingfrenzyAttachment],
            'blockchain-vvvip-member': [vvvipmemberMarkdown, vvvipmemberMitigation, vvvipmemberArt, vvvipmemberDescription, vvvipmemberAttachment],
            'blockchain-inju-bank': [injubankMarkdown, injubankMitigation, injubankArt, injubankDescription, injusgambitAttachment],
            'blockchain-silent-dealer': [silentDealerMarkdown, silentDealerMitigation, silentDealerArt, silentDealerDescription, silentDealerAttachment],
            'blockchain-singular-entity': [singularentityMarkdown, singularentityMitigation, singularentityArt, singularentityDescription, singularentityAttachment],
            'blockchain-unlimited-credit-line': [unlimitedCreditMarkdown, unlimitedCreditMitigation, unlimitedCreditArt, unlimitedCreditDescription, unlimitedCreditAttachment],
            'blockchain-symbol-of-noble': [symbolofnobleMarkdown, symbolofnobleMitigation, symbolofnobleArt, symbolofnobleDescription, symbolofnobleAttachment],
            'blockchain-casino-vault': [casinovaultMarkdown, casinovaultMitigation, casinovaultArt, casinovaultDescription, casinovaultAttachment],
            'blockchain-injus-gambit': [injusgambitMarkdown, '', injusgambitArt, injusgambitDescription, injusgambitAttachment],
            'blockchain-casino-bankbuster': [casinobankbusterMarkdown, '', casinobankbusterArt, casinobankbusterDescription, casinobankbusterAttachment],
            'blockchain-executive-problems': [executiveproblemsMarkdown, '', executiveproblemsArt, executiveproblemsDescription, executiveproblemsAttachment],
            'blockchain-double-or-nothing': [doubleornothingMarkdown, '', doubleornothingArt. doubleornothingDescription, briefingAttachment],
          };

          const [story, mitigation, art, desc, attachment] = markdownMap[challengeCode] || [];
          setPost(story);
          setMitigation(mitigation);
          setImage(art);
          setDesc(desc);
          setAttachment(attachment);
        }
      })
      .catch(console.error);
  }, [challengeCode]);

  const hintImages = {
    1: hints_1,
    2: hints_2,
    3: hints_3
  }

  // FOR HINTS
  useEffect(() => {
    const handleClickOutside = () => setIsPopupOpen(false);
  
    if (isPopupOpen) {
      window.addEventListener('click', handleClickOutside);
    }
  
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isPopupOpen]);

  const renderBoxes = () => {
    if (!data) return null;

    const { challengeDifficulty } = data;

    const storyBox = (
      <div className="heist-description-container" key="story">
        <h2>Story</h2>
        <ReactMarkdown
          children={post}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              if (inline) {
                return (
                  <code className="react-markdown-inline-code" {...props}>
                    {children}
                  </code>
                );
              } else {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    style={xonokai}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            },
            img({ src, alt, ...props }) {
              return (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                  <img
                    src={src}
                    alt={alt}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    {...props}
                  />
                </div>
              );
            },
          }}
          className="react-markdown-loader"
        />
      </div>
    );

    const codeBox = (
      <div className="heist-code-container" key="code">
        <h2>Hands-On</h2>
        <div className="heist-code-content">
          <div className="heist-description">
            <ReactMarkdown children={desc} className="heist-codebox-description"/>
          </div>
          <div className="heist-download" onClick={handleDownload}>
            <img src={downloadLogo} alt="Download" />
            <p>Download</p>
          </div>
        </div>
        <div className="heist-input-container">
          <input
            type="text"
            className="heist-input-flag"
            placeholder="heist here!"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
          />
          <button className="heist-submit-button" onClick={handleFlagSubmit}>
            <p>Submit Flag</p>
          </button>
          <div className="heist-hints">
              {[1, 2, 3].map((hint) => (
                <div
                  key={hint}
                  className="heist-hint-box"
                  onClick={() => handleHintClick(hint)}
                >
                  <img 
                    src={hintImages[hint]} 
                    alt={`Hint ${hint}`} 
                    className="hint-image" 
                  />
                </div>
            ))}
          </div>
        </div>
        {/* Confirmation Popup */}
        {isConfirmPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content-confirmation">
            <p>Are you sure you want to use this hint?</p>
            <button onClick={handleConfirmYes} className='button-one'>Yes</button>
            <button onClick={handleConfirmNo} className='button-two'>No</button>
          </div>
        </div>
      )}
      
      {/* FLAG POP UP */}
      {isPopupOpenFlag && (
        <div className={`${flagStatus}`}>
          <div className="flag-popup-content">{popupMessage}</div>
        </div>
      )}

        {/* Popup Box */}
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              {/* <ReactMarkdown children={hintMessage}/> */}
              <ReactMarkdown className="top-hints-message">{hintTopMessage}</ReactMarkdown>
              <br />
              <ReactMarkdown className="real-hints-message">{hintMessage}</ReactMarkdown>
              <br />
              <ReactMarkdown className="bottom-hints-message">{hintBottomMessage}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    );

    const mitigationBox = solved && (
      <div className="heist-code-container" key="mitigation">
        <h2>Mitigation</h2>
        <ReactMarkdown
          children={mitigation}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              if (inline) {
                return (
                  <code className="react-markdown-inline-code" {...props}>
                    {children}
                  </code>
                );
              } else {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    style={xonokai}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            },
          }}
          className="react-markdown-loader"
        />
      </div>
    );

    switch (challengeDifficulty) {
      case 'basic':
        return [codeBox, storyBox];
      case 'vip':
        return [storyBox, codeBox];
      case 'common':
        return [storyBox, codeBox, mitigationBox];
      default:
        return [];
    }
  };

  return (
    <div className="heist-container">
      {data ? <h1>{data.challengeName}</h1> : <h1>Loading...</h1>}
      <div className="heist-challenge-image">
        <img src={image} alt="Challenge" />
      </div>
      {renderBoxes()}
    </div>
  );
};

export default Heist;