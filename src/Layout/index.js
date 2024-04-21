import React from "react";
import NavigationMenu from "../Components/SideBars/NavigationMenu";
import { Outlet } from "react-router-dom";
import SearchMenu from "../Components/SideBars/SearchMenu";
import { useLocation } from "react-router-dom"; 

import { Box } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const drawerWidth = 270;
const rightBarWidth = 340;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, rightOpen }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    marginRight: `-${rightBarWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    ...(rightOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    paddingTop: "25px",
    minHeight: "100vh",
  })
);

const Index = () => {
  const [openNavigation, setOpenNavigation] = useState(true);
  const [rightBarOpen, setRightBarOpen] = useState(true);
  const location = useLocation();
  const isEmployeePage = location.pathname === "/record";
  const conditionalDrawerWidth = isEmployeePage ? rightBarWidth : 0;

  return (
    <Box sx={{ display: "flex" }} position="relative">
      <NavigationMenu drawerWidth={drawerWidth} open={openNavigation} />
      <Main
        open={openNavigation}
        rightOpen={rightBarOpen}
        sx={{
          paddingTop: "25px",
          minHeight: "100vh",
          backgroundColor: "rgba(241, 245, 255, 1)",
        }}
      >
        <Outlet />
      </Main>
      <SearchMenu drawerWidth={conditionalDrawerWidth} open={rightBarOpen} />
    </Box>
  );
};

export default Index;