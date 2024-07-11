// CSS / React / Pixi
import './App.css'
import MapDisplay from "./components/MapDisplay/MapDisplay.jsx";
import BattleScreen from "./components/BattleScreen/BattleScreen.jsx";
import GameUI from "./components/GameUI/GameUI.jsx"

import { useEffect } from 'react';
import { useSelector } from "react-redux";

// Enums
import { GameState } from "./data/enums.js";

function App({ gameEngine }) {
  const { gameState } = useSelector((state) => state.gameState);
  const { input, display } = gameEngine;
  function handlePointerUp(event) {
    console.log(event);
    input.pointerUp(event);
  }
  
  function handleResize(event) {
    display.resize(event.currentTarget.innerWidth, event.currentTarget.innerHeight)
  }

  useEffect(() => {
    document.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
  }, [])

  return (
    <main onContextMenu={(event) => { event.preventDefault(); }}>
      { (gameState === GameState.mapStart || gameState === GameState.map || gameState === GameState.roomStart) && 
        <MapDisplay gameEngine={gameEngine}/>
      }
      { gameState === GameState.idle &&
        <BattleScreen gameEngine={gameEngine} />
      }
    </main>
  );
}
export default App
