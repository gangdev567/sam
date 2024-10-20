import React, { useState } from "react";
import EstateMenu from "./EstateMenu";
import BuildingManager from "../../components/buildings/BuildingManager";
import { Button } from "@mui/material";
import EstateMap from "./EstateMap";

const EstatePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <BuildingManager />
      </main>
    </div>
  );
};

export default EstatePage;
