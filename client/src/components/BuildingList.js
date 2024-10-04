import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import BuildingCard from "./BuildingCard";
import ResourceDisplay from "./ResourceDisplay";
import ConstructionOptions from "./ConstructionOptions";
import TerritoryExpansion from "./TerritoryExpansion";
import EventNotification from "./EventNotification";
import SpecialBuildings from "./SpecialBuildings";
import StatisticsPanel from "./StatisticsPanel";
import BuildingFilter from "./BuildingFilter";
import BuildingGrid from "./BuildingGrid";
import BuildingManagementOptions from "./BuildingManagementOptions";
import MiniMap from "./MiniMap";
import PopupNotification from "./PopupNotification";
import MainMapView from "./MainMapView";
import HeaderSection from "./HeaderSection";

const BuildingList = () => {
  console.log("BuildingList 컴포넌트 실행");

  const [buildings, setBuildings] = useState([]);
  const [resources, setResources] = useState([]);
  const [availableBuildings, setAvailableBuildings] = useState([]);
  const [territoryInfo, setTerritoryInfo] = useState({});
  const [specialBuildings, setSpecialBuildings] = useState([]);
  const [events, setEvents] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});

  useEffect(() => {
    Promise.all([
      fetch("/api/buildings"),
      fetch("/api/resources"),
      fetch("/api/construction-options"),
      fetch("/api/territory/info"),
      fetch("/api/special-buildings"),
      fetch("/api/events"),
      fetch("/api/statistics"),
      fetch("/api/player/info"),
    ])
      .then(
        ([
          buildingsResponse,
          resourcesResponse,
          constructionOptionsResponse,
          territoryInfoResponse,
          specialBuildingsResponse,
          eventsResponse,
          statisticsResponse,
          playerInfoResponse,
        ]) =>
          Promise.all([
            buildingsResponse.json(),
            resourcesResponse.json(),
            constructionOptionsResponse.json(),
            territoryInfoResponse.json(),
            specialBuildingsResponse.json(),
            eventsResponse.json(),
            statisticsResponse.json(),
            playerInfoResponse.json(),
          ])
      )
      .then(
        ([
          buildingsData,
          resourcesData,
          constructionOptionsData,
          territoryInfoData,
          specialBuildingsData,
          eventsData,
          statisticsData,
          playerInfoData,
        ]) => {
          setBuildings(buildingsData);
          setResources(resourcesData);
          setAvailableBuildings(constructionOptionsData);
          setTerritoryInfo(territoryInfoData);
          setSpecialBuildings(specialBuildingsData);
          setEvents(eventsData);
          setStatistics(statisticsData);
          setPlayerInfo(playerInfoData);
        }
      );
  }, []);

  const buildingTypes = {
    all: "모든 건물",
    residential: "주거용 건물",
    commercial: "상업용 건물",
    industrial: "공업용 건물",
  };

  const sortOptions = {
    levelDesc: "레벨 내림차순",
    levelAsc: "레벨 오름차순",
    productionDesc: "생산량 내림차순",
    productionAsc: "생산량 오름차순",
  };

  const [currentType, setCurrentType] = useState("all");
  const [currentSort, setCurrentSort] = useState("levelDesc");

  const filteredBuildings = buildings.filter(
    (building) => currentType === "all" || building.type === currentType
  );

  const sortedBuildings = filteredBuildings.sort((a, b) => {
    switch (currentSort) {
      case "levelDesc":
        return b.level - a.level;
      case "levelAsc":
        return a.level - b.level;
      case "productionDesc":
        return b.productionRate - a.productionRate;
      case "productionAsc":
        return a.productionRate - b.productionRate;
      default:
        return 0;
    }
  });

  const constructBuilding = (building) => {
    // 건물 건설 로직 구현 필요
    console.log(`건물 ${building.name}을(를) 건설합니다.`);
  };

  const expandTerritory = () => {
    // 영지 확장 로직 구현 필요
    console.log("영지를 확장합니다.");
  };

  const moveBuilding = (buildingId, x, y) => {
    console.log(`건물 ${buildingId}을 위치 (${x}, ${y})f로 이동시킵니다.`);
    // 실제 API 호출 및 상태 업데이트 로직 구현 ㅎ필요
  };

  const updateBuildingOptions = (updatedBuilding) => {
    setBuildings((prevBuildings) =>
      prevBuildings.map((b) =>
        b.id === updatedBuilding.id ? updatedBuilding : b
      )
    );
    console.log("건물 옵션을 업데이트합니다:", updatedBuilding);
    // 실제 API 호출 및 상태 업데이트 로직 구현 필요
  };

  return (
    <>
      <HeaderSection playerInfo={playerInfo} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h2>게임 대시보드</h2>

          <StatisticsPanel statistics={statistics} />

          <h3>건물 목록</h3>
          <BuildingFilter
            buildingTypes={buildingTypes}
            currentType={currentType}
            setCurrentType={setCurrentType}
            sortOptions={sortOptions}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
          <Grid container spacing={2}>
            {sortedBuildings.map((building) => (
              <Grid item key={building.id} xs={12} sm={6} md={4}>
                <BuildingCard building={building} />
              </Grid>
            ))}
          </Grid>

          <h3>자원 현황</h3>
          <ResourceDisplay resources={resources} />

          <h3>건물 배치</h3>
          <BuildingGrid buildings={buildings} moveBuilding={moveBuilding} />

          <h3>건물 관리 옵션</h3>
          {sortedBuildings.map((building) => (
            <BuildingManagementOptions
              key={building.id}
              building={building}
              updateBuildingOptions={updateBuildingOptions}
            />
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <MiniMap buildings={buildings} />

          <SpecialBuildings specialBuildings={specialBuildings} />

          <EventNotification events={events} />

          <ConstructionOptions
            availableBuildings={availableBuildings}
            constructBuilding={constructBuilding}
          />

          <TerritoryExpansion
            territoryInfo={territoryInfo}
            expandTerritory={expandTerritory}
          />
        </Grid>
      </Grid>

      <PopupNotification />

      <h2>메인 맵 뷰</h2>
      <MainMapView buildings={buildings} territorySize={territoryInfo.size} />
    </>
  );
};

export default BuildingList;
