import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Drawer,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import useUserLogin from "../../hooks/useUserLogin";
import OrangeButton from "../../styled-components/buttons/OrangeButton";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 770,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const Navbar = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userLogedIn = useUserLogin();
  const pages = [
    { name: "Home", path: "/" },
    { name: "Services", path: "services" },
    { name: "ContactUs", path: "ContactUs" },
    { name: "Booking", path: "booking/upcomming" },
    { name: "Add Service", path: "AddService" },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handelSignOut = () => {
    localStorage.removeItem("user");
    window.location.pathname = "/";
  };

  const drawerContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onClick={handleMenuOpen}>
        <AccountCircle />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      </Menu>
      {pages.map((page, index) => (
        <Button key={index} color="inherit">
          <Link to={page.path}>{page.name}</Link>
        </Button>
      ))}
    </div>
  );

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#e0c8fe" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding:"20px",
          }}
        >
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <div sx={{ flexGrow: 1 }} />

              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "right" }}>
                <Link to={"/"}>Logo</Link>
              </Typography>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "20%" }}>
                <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, maxWidth: "200px" }}
                >
                  <Link to={"/"}>Servifay</Link>
                </Typography>
              </div>

              <div
                style={{
                  width: "30%",
                  display: "flex",
                  gap: "1.5em",
                }}
              >
                {pages.map((page, index) => (
                  <Button sx={{ color: "#000" }} key={index} color="inherit">
                    <Link to={page.path}>{page.name}</Link>
                  </Button>
                ))}
              </div>
              <div
                style={{
                  width: "33%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <div>
                  <SearchIcon sx={{ color: "#888" }} />
                  <InputBase
                    sx={{ maxWidth: "150px" }}
                    placeholder="Search..."
                  />
                </div>
                {userLogedIn ? (
                  <>
                    <Button onClick={handleMenuOpen}>
                      <AccountCircle />
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        sx={{ color: "#000" }}
                        onClick={handleMenuClose}
                      >
                        <Link to={`/Profile`}>Profile</Link>
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <span onClick={handelSignOut}>Sign Out</span>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Link to={"/login"}>
                    <OrangeButton $w="90px" $h="36px" $m="0" $p="5px">
                      Login
                    </OrangeButton>
                  </Link>
                )}
              </div>
            </div>
          )}
          <Drawer anchor="top" open={mobileOpen} onClose={handleDrawerToggle}>
            {drawerContent}
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
