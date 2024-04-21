import React from "react";
import { Box, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Banner = () => {
  const headerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "20px",
    color: "black", 
    backgroundColor: blueGrey[500],
    width: "100%",
    zIndex: 1000, 
    textAlign: "center", 
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    padding: "20px",
    maxWidth: "80%",
  };

  return (
    <div>
      {/* <Box style={headerStyle}> */}
      <Typography variant="h4" style={{ fontSize: "18px", fontWeight: "bold" ,   marginTop: "1%"}}>Dashboard
        </Typography>
      {/* </Box> */}
      <Box style={contentStyle}>
        {/* Content goes here */}
        <Typography variant="h4" fontWeight={500}>
          {/* Your Content Title */}
        </Typography>
        <Typography
          variant="body1"
          fontSize={15}
          fontWeight={100}
          color={blueGrey[100]}
          marginTop={1}
        >
          {/* Your content description */}
        </Typography>
      </Box>
    </div>
  );
};

export default Banner;
