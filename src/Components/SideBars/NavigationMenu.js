import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Stack, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemsData } from "./LinksData";
import logo from "./images/logo.jpeg";
import "./sidebar.css";
import { useAuth } from "../../AuthContext";

const NavigationMenu = ({ drawerWidth, open }) => {
  const { userType } = useAuth();

  return (
    
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#342D27", 

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
              marginTop: "0px",
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
            {['Dashboard' , 'Attendance', 'Daily Assignment' , 'Assignment' , 'Logout'].includes(item.name) || userType === 'admin' ? ( 
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `${isActive ? "activeNavLink" : "inActiveNavLink"} navlink`
                }
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} style={{ color: "#FFBE00" }} /> {/* Set text color to yellow */}
                </ListItemButton>
              </NavLink>
            ) : (
              <ListItemButton disabled>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} style={{ color: "#FFBE00" }} /> {/* Set text color to yellow */}
              </ListItemButton>
            )}
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
    </Drawer>
  );
};

export default NavigationMenu;
