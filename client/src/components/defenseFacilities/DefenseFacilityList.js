import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function DefenseFacilityList({ onSelectFacility }) {
  const { appState, setAppState } = useContext(AppContext);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    setFacilities(appState.defenseFacilities);
  }, [appState.defenseFacilities]);

  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.name?.toLowerCase()?.includes(filter.toLowerCase()) ?? false
  );

  const sortedFacilities = filteredFacilities.sort((a, b) => {
    if (sortOrder === "name") {
      return (a.name || "").localeCompare(b.name || "");
    } else if (sortOrder === "level") {
      return (b.level || 0) - (a.level || 0);
    } else if (sortOrder === "defense") {
      return (b.defenseValue || 0) - (a.defenseValue || 0);
    }
    return 0;
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5">방어 시설 목록</Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="검색"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="sort-label">정렬 기준</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortOrder}
            label="정렬 기준"
            onChange={handleSortChange}
          >
            <MenuItem value="name">이름순</MenuItem>
            <MenuItem value="level">레벨순</MenuItem>
            <MenuItem value="defense">방어력순</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={2}>
        {sortedFacilities.map((facility) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={facility.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">
                  {facility.name || "Unknown Facility"}
                </Typography>
                <Stack direction="row" spacing={1} mb={1}>
                  <Chip
                    label={`타입: ${facility.facilityType || "Unknown Type"}`}
                    color="primary"
                  />
                  <Chip
                    label={`레벨: ${facility.level || 0}`}
                    color="secondary"
                  />
                  <Chip
                    label={`방어력: ${(facility.defenseValue || 0).toFixed(2)}`}
                    color="warning"
                  />
                </Stack>

                <Button
                  variant="contained"
                  color="info"
                  onClick={() => onSelectFacility(facility)}
                  fullWidth
                >
                  상세 보기
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DefenseFacilityList;
