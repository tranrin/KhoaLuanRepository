import React from "react";
import { Button } from "@mui/material";

const RoundButton = ({
  label,
  size,
  onClick,
  sx,
  disabled = false,
  type = "outlined",
  startIcon,
  endIcon,
}) => {
  return (
    <Button
      size={size}
      sx={{ height: "38px", bgcolor: "rgb(49, 49, 49)", ...sx }}
      variant={type}
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}>
      {label}
    </Button>
  );
};

export default RoundButton;
