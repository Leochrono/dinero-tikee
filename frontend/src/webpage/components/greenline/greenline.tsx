import React from "react";
import { Box, styled } from "@mui/material";

const StyledGreenLine = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  width: "80%",
  height: "4px",
  backgroundColor: theme.palette.primary.main,
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.down("lg")]: {
    width: "90%",
  },
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
}));

const GreenLine: React.FC = () => {
  return <StyledGreenLine />;
};

export default GreenLine;
