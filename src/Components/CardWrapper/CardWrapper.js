import { Grid } from "@mui/material";
import React from "react";
import BigCard from "../BigCard/BigCard"; 
import { ListItemsData } from "../SideBars/LinksData";
import { useAuth } from "../../AuthContext";

const CardWrapper = () => {
  const { userType } = useAuth();

  const adminIndices = [0, 2, 3, 5, 7, 9, 10, 11, 13, 15, 16, 17, 18, 19];
  const userIndices = [0, 2, 3, 5, 7, 9, 10, 11, 13, 15, 16, 17, 18, 19];

  const includedIndices = userType === 'admin' ? adminIndices : userIndices;

  const filteredItems = ListItemsData?.filter((_, index) => includedIndices.includes(index + 1));

  const disabled = userType !== 'admin';

  return (
    <Grid container spacing={2} justifyContent="center" marginTop={5}>
      <BigCard items={filteredItems} disabled={disabled} />
    </Grid>
  );
};

export default CardWrapper;
