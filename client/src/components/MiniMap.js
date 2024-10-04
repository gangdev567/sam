import { Grid } from "@mui/material";

const MiniMap = ({ buildings }) => {
  return (
    <div style={{ width: '200px', height: '200px', border: '1px solid #ccc', overflow: 'hidden' }}>
      <Grid container spacing={1}>
        {[...Array(20)].map((_, yIndex) => (
          <Grid item xs={12} key={`row-${yIndex}`}>
            {[...Array(20)].map((_, xIndex) => (
              <Grid item xs={1} key={`cell-${xIndex}-${yIndex}`} className="mini-map-cell">
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

export default MiniMap;