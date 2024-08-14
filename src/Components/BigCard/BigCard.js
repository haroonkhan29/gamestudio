import React from "react";
import Card from "../Card/Card";
import { Grid } from "@mui/material";
import { useAuth } from "../../AuthContext"; 

const BigCard = ({ items }) => {
  const { userType } = useAuth(); 

  const isItemEnabled = (item) => {
    if (userType === 'admin') return true;

    const allowedItems = ['Dashboard', 'Attendance', 'Daily Assignment','Assignment', 'Logout'];
    return allowedItems.includes(item.name);
  };

  const firstRowItems = items.slice(0, 4);
  const secondRowItems = items.slice(4, 13);
  const thirdRowItems = items.slice(13);

  return (
    <div style={{ backgroundColor: "#342D27", padding: "10px", borderRadius: "20px", width: "100%" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid container item xs={12} spacing={2}>
          {firstRowItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card item={item} disabled={!isItemEnabled(item)} />
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {secondRowItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card item={item} disabled={!isItemEnabled(item)} />
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          {thirdRowItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={6}>
              <Card item={item} disabled={!isItemEnabled(item)} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default BigCard;
