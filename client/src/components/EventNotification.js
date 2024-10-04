import { Card, CardContent, Typography } from "@mui/material";

const EventNotification = ({ events }) => {
  const activeEvents = events.filter((event) => event.isActive);

  if (activeEvents.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h5">이벤트 알림</Typography>
      {activeEvents.map((event) => (
        <Card key={event.id}>
          <CardContent>
            <Typography variant="body1">{event.name}</Typography>
            <Typography variant="body2">
              기간: {event.startDate} ~ {event.endDate}
            </Typography>
            <Typography variant="body2">보상: {event.reward}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventNotification;