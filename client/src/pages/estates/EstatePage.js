// src/pages/estates/EstatePage.js
import React, { useContext, useState } from "react";
import EstateMenu from "./EstateMenu";
import BuildingManager from "../../components/buildings/BuildingManager";
import { Button } from "@mui/material";
import EstateMap from "./EstateMap";
import { AppContext } from "../../context/AppContext";
import ResourceManager from "../../components/resources/ResourceManager";
import DefenseManager from "../../components/defenseFacilities/DefenseManager";
import PopulationManager from "../../components/populations/PopulationManager";
import ResearchManager from "../../components/researches/ResearchManager";

const EstatePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { appState } = useContext(AppContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* 메뉴 토글 버튼 */}
      <Button onClick={toggleMenu}>메뉴 열기</Button>

      {/* EstateMenu 컴포넌트 */}
      <EstateMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main
        style={{
          marginLeft: isMenuOpen ? "240px" : "0",
          transition: "margin 300ms ease-in-out",
        }}
      >
        <h1>Estate Overview</h1>
        {/* EstateMap 컴포넌트 */}
        <EstateMap />
        <BuildingManager buildings={appState.buildings} />
        <ResourceManager
          resources={appState.resources}
          buildings={appState.buildings}
        />
        <DefenseManager />
        <PopulationManager />
        <ResearchManager />
      </main>
    </div>
  );
};

export default EstatePage;
