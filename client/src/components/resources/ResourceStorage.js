import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

function ResourceStorage({ resources }) {
  const [selectedResource, setSelectedResource] = useState(null);

  const handleSelectResource = (resource) => {
    setSelectedResource(resource);
  };

  const handleUseResource = () => {
    if (!selectedResource) return;

    // 자원 사용 로직 구현
    selectedResource.use(100); // 예시: 100 단위의 자원 사용
    setSelectedResource(null);
  };

  const handleUpgradeResource = () => {
    if (!selectedResource) return;

    // 자원 업그레이드 로직 구현
    selectedResource.upgrade("production");
    setSelectedResource(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">자원 저장소</Typography>

      <Grid container spacing={2}>
        {/* 자원 목록 */}
        {resources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={resource.name}>
            <Card onClick={() => handleSelectResource(resource)}>
              <CardContent>
                <Typography variant="h6">{resource.name}</Typography>
                <Typography>{`현재 양: ${resource.amount}`}</Typography>
                <Typography>{`최대 용량: ${resource.maxCapacity}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* 선택된 자원 상세 정보 */}
        {selectedResource && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">{selectedResource.name}</Typography>
                <Typography>{`현재 양: ${selectedResource.amount}`}</Typography>
                <Typography>{`최대 용량: ${selectedResource.maxCapacity}`}</Typography>
                <Typography>{`생산 속도: ${selectedResource.productionRate}`}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={handleUseResource}>자원 사용</Button>
                <Button onClick={handleUpgradeResource}>업그레이드</Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default ResourceStorage;
