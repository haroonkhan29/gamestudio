import React from "react";
import Card from "../Card/Card";
import { Grid } from "@mui/material";

const BigCard = ({ items }) => {
  const firstRowItems = items.slice(0, 4);
  const secondRowItems = items.slice(4, 11);
  const thirdRowItems = items.slice(11);

  return (
    <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "20px", width: "100%" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid container item xs={12} spacing={2}>
          {firstRowItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card item={item} />
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {secondRowItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card item={item} />
            </Grid>
          ))}
        </Grid>

        {/* Third Row */}
        <Grid container item xs={12} justifyContent="center">
          {thirdRowItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={6}>
              <Card item={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default BigCard;
