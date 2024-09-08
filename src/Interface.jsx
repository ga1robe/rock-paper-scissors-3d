// Copyright (c) 2024 Robert Gajewski <robert.gajewski@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useEffect, useState } from "react";
import Logo from "./assets/rps3d.svg";
import MLogo from "./assets/mm_white.svg";
import useGame from "./stores/useGame.js";

const modes = [
  { id: "0", text: "Three Wins", name: "threeWins" },
  { id: "1", text: "Five Wins", name: "fiveWins" },
  { id: "2", text: "Seven Wins", name: "sevenWins" },
  { id: "3", text: "Endless", name: "endless" },
];

export default function Interface() {
  const {
    mode,
    setMode,
    round,
    resetRound,
    restart,
    playerScore,
    computerScore,
  } = useGame();

  const handleModeChange = (newMode) => {
    setMode(newMode);
    handleRestart();
  };

  const modeOptions = modes.map((modeOption) => (
    <div
      key={modeOption.id}
      className={`mode-selection ${
        mode === modeOption.name ? "selected-mode" : ""
      }`}
      onClick={() => handleModeChange(modeOption.name)}
    >
      {modeOption.text}
    </div>
  ));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const clearData = () => {
    window.localStorage.clear();
  };
  const handleRestart = () => {
    restart();
    resetRound();
    setPlayerScore(0);
    setComputerScore(0);
  };
  const [selectedMode, setSelectedMode] = useState(null);
  useEffect(() => {
    setSelectedMode(modeOptions.find((m) => m.name === mode));
  }, []);
  function handleModeClick(mode) {
    setSelectedMode(mode);
  }
  return (
    <>
      <img className="logo" src={Logo} alt="Rock Paper Scissors 3D Logo" />
      <div className="control-buttons">
        <div
          className="control-button"
          id="menu"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <img src="./icons/menu.svg" alt="menu" />
        </div>
      </div>
      <a href="https://michaelkolesidis.com" target="_blank">
        <img className="author" src={MLogo} alt="author's logo"></img>
      </a>
      <div className="score">
        <div className="individual-score">
          Round {round}
          <div className="mode-info">{mode}</div>
        </div>
        <div className="individual-score">You: {playerScore}</div>
        <div className="individual-score">Computer: {computerScore}</div>
      </div>
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Menu</div>
            <div className="modal-main">
              <div className="section-title">Mode</div>
              <div className="mode-area">{modeOptions}</div>
              <div className="section-title">Data</div>
              <div
                className="modal-button"
                onClick={() => {
                  clearData();
                  handleRestart();
                }}
              >
                Clear Data
              </div>
            </div>
            <div className="modal-about-area">
              <div className="modal-about">© 2023 Michael Kolesidis.</div>
              <div className="modal-about">Licensed under the GNU AGPL 3.0</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
