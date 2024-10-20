import React, { useContext, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { AppContext } from "../../context/AppContext";

const PopulationChart = () => {
  const { appState } = useContext(AppContext);

  const chartData = useMemo(() => {
    if (!appState.populations.length) return [];

    const maxHistoryLength = Math.max(
      ...appState.populations.map((pop) => pop.eventHistory.length)
    );

    const data = Array(maxHistoryLength)
      .fill(0)
      .map((_, index) => ({
        time: index + 1,
        ...appState.populations.reduce((acc, pop) => {
          const event = pop.eventHistory[index];
          acc[pop.name] = event
            ? parseInt(event.timestamp / 1000)
            : index > 0
            ? acc[pop.name]
            : 0;
          return acc;
        }, {}),
      }));

    return data;
  }, [appState.populations]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">인구 추이 그래프</Typography>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        {appState.populations.map((pop, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={pop.name}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </Box>
  );
};

export default PopulationChart;
