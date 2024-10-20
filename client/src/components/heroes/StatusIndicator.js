import { Avatar, Chip, Tooltip } from "@mui/material";
import { styled } from "@mui/styles";

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

function StatusIndicator({ status }) {
  let chipColor = "default";
  let icon = null;
  let tooltipText = "";

  switch (status) {
    case "idle":
      chipColor = "primary";
      icon = <StyledAvatar>🏠</StyledAvatar>;
      tooltipText = "대기 중";
      break;
    case "questing":
      chipColor = "secondary";
      icon = <StyledAvatar>🎯</StyledAvatar>;
      tooltipText = "임무 수행 중";
      break;
    case "resting":
      chipColor = "success";
      icon = <StyledAvatar>😴</StyledAvatar>;
      tooltipText = "휴식 중";
      break;
    default:
      chipColor = "error";
      icon = <StyledAvatar>❓</StyledAvatar>;
      tooltipText = "알 수 없는 상태";
  }

  return (
    <Tooltip title={tooltipText}>
      <StyledChip icon={icon} label={status.toUpperCase()} color={chipColor} />
    </Tooltip>
  );
}

export default StatusIndicator;
