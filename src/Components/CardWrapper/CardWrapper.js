import { Grid } from "@mui/material";
import React from "react";
import BigCard from "../BigCard/BigCard"; 
import { ListItemsData } from "../SideBars/LinksData";

const CardWrapper = () => {
  // const includedIndices = [0,2,3,4,6,8,10,12,14,15,16];
  const includedIndices = [0,2,3,4,6,8,9,10,12,14,15,16];
  const filteredItems = ListItemsData?.filter((_, index) => includedIndices.includes(index + 1));

  return (
    <Grid container spacing={2} justifyContent="center" marginTop={5}>
      <BigCard items={filteredItems} />
    </Grid>
  );
};

export default CardWrapper;
