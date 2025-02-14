import { Box } from "@mui/material";
import Navbar from "@/webpage/components/navbar/navbar";
import Carousel from "@/components/carrousel/carousel";
const Header = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "transparent",
          zIndex: 2,
        },
      }}
    >
      <Navbar />
      <Carousel />
      <Box
        sx={{ position: "absolute", bottom: 0, width: "100%", zIndex: 2 }}
      ></Box>
    </Box>
  );
};

export default Header;
