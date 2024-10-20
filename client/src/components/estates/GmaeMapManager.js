// src/components/GameMapManager.js
import React, { useState, useEffect, useRef } from 'react';
import Terrain from '../../utils/Terrain';

const GameMapManager = ({ children }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [terrain, setTerrain] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    initializeTerrain(currentStage);
  }, [currentStage]);

  const initializeTerrain = (stage) => {
    const newTerrain = new Terrain(stage);
    setTerrain(newTerrain);
    renderTerrain(newTerrain);
  };

  const renderTerrain = (terrain) => {
    if (mapRef.current) {
      terrain.renderTerrain(mapRef.current.id);
    }
  };

  const handleNextStage = () => {
    if (currentStage < 3) { // 최대 스테이지 3 가정
      setCurrentStage(prevStage => prevStage + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(prevStage => prevStage - 1);
    }
  };

  return (
    <div>
      <h2>현재 스테이지: {currentStage}</h2>
      <button onClick={handlePrevStage}>이전 스테이지</button>
      <button onClick={handleNextStage}>다음 스테이지</button>
      <div ref={mapRef} id="terrain-container"></div>
      {children}
    </div>
  );
};

export default GameMapManager;
