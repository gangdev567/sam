// src/context/AppContext.js
import React, { createContext, useState, useEffect } from "react";
import resources from "../data/Resources";
import buildings from "../data/Buildings";
import heroes from "../data/Heroes";
import estates from "../data/Estates";
import defenseFacilities from "../data/DefenseFacilities";
import populations from "../data/Populations";
import researches from "../data/Researches";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    resources: [],
    buildings: [],
    defenseFacilities: [],
    estates: [],
    heroes: [],
    populations: [],
    researches: [],
  });

  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      resources,
      buildings,
      defenseFacilities,
      estates,
      heroes,
      populations,
      researches,
    }));
  }, []);

  const updateResources = (newResources) => {
    setAppState((prevState) => ({
      ...prevState,
      resources: newResources,
    }));
  };

  const updateBuildings = (newBuildings) => {
    setAppState((prevState) => ({
      ...prevState,
      buildings: newBuildings,
    }));
  };

  const updateDefenseFacilities = (newDefenseFacilities) => {
    setAppState((prevState) => ({
      ...prevState,
      defenseFacilities: newDefenseFacilities,
    }));
  };

  const updateEstates = (newEstates) => {
    setAppState((prevState) => ({
      ...prevState,
      estates: newEstates,
    }));
  };

  const updateHeroes = (newHeroes) => {
    setAppState((prevState) => ({
      ...prevState,
      heroes: newHeroes,
    }));
  };

  const updatePopulations = (newPopulations) => {
    setAppState((prevState) => ({
      ...prevState,
      populations: newPopulations,
    }));
  };

  const updateResearches = (newResearches) => {
    setAppState((prevState) => ({
      ...prevState,
      populations: newResearches,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
        updateResources,
        updateBuildings,
        updateDefenseFacilities,
        updateEstates,
        updateHeroes,
        updatePopulations,
        updateResearches,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
