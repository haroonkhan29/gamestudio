import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Card.css"; 

const Card = ({ item, disabled }) => {
  const iconSize = item.iconSize || { width: 65, height: 65, borderRadius: "30%" };

  const cardContent = (
    <Grid
      item
      borderRadius={3}
      paddingTop={2}
      paddingLeft={2}
      paddingRight={2}
      className={`card ${disabled ? '' : 'hover-effect'}`}
      style={{
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        style={{
          width: "max-content",
          padding: "10px",
          backgroundColor: item.isDashboard ? "blue" : item.color?.[50] || "",
          color: item.isDashboard ? "white" : item.color?.[500] || "",
          borderRadius: "6px", 
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto", 
        }}
      >
        <div style={{ 
          backgroundColor: item.color?.[50] || "", 
          padding: "8px", 
          borderRadius: "8px", 
          height: "70px", 
          width: "200px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}>
          {React.cloneElement(item.icon, { style: { ...item.icon.props.style, ...iconSize } })}
          <Typography
            variant="body1"
            fontWeight={400}
            sx={{
              color: "rgb(2, 131, 211)",
              textAlign: "center",
              fontWeight: "450",
              marginLeft: "10px", 
            }}
          >
            {item.name}
          </Typography>
        </div>
      </div>
      <Box display="flex" justifyContent="right" color="inherit">
        {/* <ArrowRightAltIcon /> */}
      </Box>
    </Grid>
  );

  return disabled ? (
    <div style={{ width: "100%" }}>{cardContent}</div>
  ) : (
    <Link to={item.link} style={{ textDecoration: "none", width: "100%" }}>
      {cardContent}
    </Link>
  );
};

export default Card;
