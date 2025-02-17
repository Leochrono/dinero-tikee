import { Typography, styled } from "@mui/material";

const DestacadoTag = styled(Typography)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("md")]: {
    display: "block",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center",
    borderRadius: "12px",
    margin: "8px",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    maxWidth: "calc(100% - 16px)",
    transform: "translateY(-50%)",
    zIndex: 2,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    "&:hover": {
      transform: "translateY(-50%) scale(1.02)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    },
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: "4px 10px",
    margin: "6px",
    maxWidth: "calc(100% - 12px)",
    borderRadius: "8px",
  },

  "@media (max-width: 320px)": {
    fontSize: "11px",
    padding: "3px 8px",
    margin: "4px",
    maxWidth: "calc(100% - 8px)",
  },
}));

export default DestacadoTag;
