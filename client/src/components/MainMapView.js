import { Grid } from "@mui/material";

const MainMapView = ({ buildings, territorySize }) => {
  const gridStyle = {
    width: `${territorySize * 50}px`,
    height: `${territorySize * 50}px`,
    border: '1px solid #ccc',
    overflow: 'hidden'
  };

  return (
    <div style={gridStyle}>
      <Grid container spacing={1}>
        {[...Array(territorySize)].map((_, yIndex) => (
          <Grid item xs={12} key={`row-${yIndex}`}>
            {[...Array(territorySize)].map((_, xIndex) => (
              <Grid item xs={1} key={`cell-${xIndex}-${yIndex}`} className="main-map-cell">
                {buildings.find(b => b.x === xIndex && b.y === yIndex) && (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#888', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {buildings.find(b => b.x === xIndex && b.y === yIndex).name.charAt(0)}
                  </div>
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MainMapView;