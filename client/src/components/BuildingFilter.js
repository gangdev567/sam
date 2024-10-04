import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const BuildingFilter = ({
  buildingTypes,
  currentType,
  setCurrentType,
  sortOptions,
  currentSort,
  setCurrentSort,
}) => {
  const handleTypeChange = (event) => {
    setCurrentType(event.target.value);
  };

  const handleSortChange = (event) => {
    setCurrentSort(event.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <FormControl fullWidth>
        <InputLabel id="building-type-label">건물 유형</InputLabel>
        <Select
          labelId="building-type-label"
          id="building-type-select"
          value={currentType}
          label="건물 유형"
          onChange={handleTypeChange}
        >
          {Object.keys(buildingTypes).map((type) => (
            <MenuItem key={type} value={type}>
              {buildingTypes[type]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginTop: "10px" }}>
        <InputLabel id="sort-options-label">정렬 옵션</InputLabel>
        <Select
          labelId="sort-options-label"
          id="sort-options-select"
          value={currentSort}
          label="정렬 옵션"
          onChange={handleSortChange}
        >
          {Object.keys(sortOptions).map((option) => (
            <MenuItem key={option} value={option}>
              {sortOptions[option]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default BuildingFilter;
