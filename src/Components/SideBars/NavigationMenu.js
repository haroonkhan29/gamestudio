import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Stack, Typography, Box, Button } from "@mui/material";
import { NavLink, Link } from "react-router-dom"; 
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemsData } from "./LinksData";
import logo from "./images/logo2.PNG";
import "./sidebar.css";

const NavigationMenu = ({ drawerWidth, open }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textTransform: "uppercase" }}
        paddingBottom={0}
      >
        <Stack direction="row">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              marginRight: "10px",
              marginTop: "8px",
            }}
          />
        </Stack>
        <Typography
          fontSize={23}
          fontWeight={800}
          className="fontHeader"
          style={{ marginTop: "15px" }}
        ></Typography>
        <Typography
          fontSize={12}
          letterSpacing={30}
          className="fontHeader"
          style={{ marginTop: "1px", backgroundColor: "yellow" }}
        ></Typography>
      </Box>
      <List>
        {ListItemsData.map((item, index) => (
          <ListItem key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `${isActive ? "activeNavLink" : "inActiveNavLink"} navlink`
              }
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <div className="bottomCard">
        <div className="imageWrapper">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="textWrapper">
          <Typography variant="h7">Easin Arafat</Typography>
          <Typography variant="body1" fontSize={12} color="gray">
            Free Account
          </Typography>
        </div>
        <div className="iconWrapper">
          <LogoutIcon />
        </div>
      </div>
      <Link to="/next">
        {/* <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
          Next
        </Button> */}
      </Link>
    </Drawer>
  );
};

export default NavigationMenu;
