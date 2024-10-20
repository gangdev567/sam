import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ResourceList from "../components/resources/ResourceList";
import resources from "../data/Resources";

function ResourcePage() {
  const [autoProduce, setAutoProduce] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentResources, setCurrentResources] = useState([]);

  useEffect(() => {
    const initialResources = resources.map((resource) => ({
      ...resource,
      amount: resource.initialAmount || 0,
    }));
    setCurrentResources(initialResources);
  }, []);
  const handleToggleAutoProduce = () => {
    setAutoProduce(!autoProduce);
  };

  const produceResources = () => {
    const updatedResources = currentResources.map((resource) => {
      const producedAmount = Math.min(
        resource.productionRate,
        resource.maxCapacity - resource.amount
      );
      return { ...resource, amount: resource.amount + producedAmount };
    });
    setCurrentResources(updatedResources);
    setCurrentTime(currentTime + 1);
  };

  const handleUpgrade = (upgradedResource) => {
    const updatedResources = currentResources.map((resource) =>
      resource.name === upgradedResource.name ? upgradedResource : resource
    );
    setCurrentResources(updatedResources);
  };

  useEffect(() => {
    let intervalId;
    if (autoProduce) {
      intervalId = setInterval(produceResources, 1000); // 1초마다 리소스 생산
    }
    return () => clearInterval(intervalId);
  }, [autoProduce]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        리소스 관리 페이지
      </Typography>

      <FormControlLabel
        control={
          <Switch checked={autoProduce} onChange={handleToggleAutoProduce} />
        }
        label="자동 생산"
      />

      <Button variant="contained" onClick={produceResources} sx={{ mt: 2 }}>
        수동 생산
      </Button>

      <Typography variant="body1" sx={{ mt: 2 }}>
        현재 시간: {currentTime} 초
      </Typography>

      <ResourceList resources={resources} onUpgrade={handleUpgrade} />
    </Box>
  );
}

export default ResourcePage;
