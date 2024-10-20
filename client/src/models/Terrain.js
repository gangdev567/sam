// src/utils/Terrain.js
class Terrain {
  constructor(stage) {
    this.stage = stage;
    this.gridSize = this.calculateGridSize();
    this.layout = this.createLayout();
  }

  calculateGridSize() {
    return 2 * this.stage + 1; // 스테이지 1: 3x3, 스테이지 2: 5x5, ...
  }

  createLayout() {
    const layout = [];
    for (let i = 0; i < this.gridSize; i++) {
      layout.push([]);
      for (let j = 0; j < this.gridSize; j++) {
        layout[i].push({ x: i, y: j, terrainType: this.getRandomTerrainType() });
      }
    }
    return layout;
  }

  getRandomTerrainType() {
    const terrainTypes = ['grass', 'forest', 'mountain', 'river'];
    return terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
  }

  renderTerrain(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // 기존 내용 초기화

    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
    container.appendChild(gridContainer);

    this.layout.forEach(row => {
      row.forEach(cell => {
        const cellElement = document.createElement('div');
        cellElement.style.border = '1px solid black';
        cellElement.style.padding = '10px';
        cellElement.textContent = cell.terrainType;
        gridContainer.appendChild(cellElement);
      });
    });
  }
}

export default Terrain;
