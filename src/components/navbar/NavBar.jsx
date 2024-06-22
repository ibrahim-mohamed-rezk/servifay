import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Drawer,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserLogin from "../../hooks/useUserLogin";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../store/slices/auth/authSlice";
import styles from "./navbar.module.css";
import { useIntl } from "react-intl";

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

const Navbar = ({ changeLanguage }) => {
  const lang = useSelector((state) => state.lang);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const intl = useIntl();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userLogedIn = useUserLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const pages = [
    { name: intl.formatMessage({ id: "home" }), path: "/" },
    { name: intl.formatMessage({ id: "services" }), path: "/services" },
    { name: intl.formatMessage({ id: "contactUs" }), path: "/ContactUs" },
    {
      name: intl.formatMessage({ id: "booking" }),
      path: `/booking/upcomming/${user.id}`,
    },
    { name: intl.formatMessage({ id: "addService" }), path: "/AddService" },
    { name: intl.formatMessage({ id: "requests" }), path: "/requests" },
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
    dispatch(setLogOut());
    navigate("/login");
    setMobileOpen(false);
  };

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
    if (event.target.value === "eg") {
      localStorage.setItem("lang_api", "ar");
    } else {
      localStorage.setItem("lang_api", event.target.value);
    }
    localStorage.setItem("lang", event.target.value);
    setMobileOpen(false);
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>

            <MenuItem
              onClick={() => {
                handleMenuClose();
                handelSignOut();
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Link to={"/login"}>
          <OrangeButton
            $w="100px"
            $h="36px"
            $m="15px"
            $p="5px"
            onClick={() => {
              setMobileOpen(false);
            }}
          >
            Login
          </OrangeButton>
        </Link>
      )}

      {pages.map((page, index) => {
        if (!user.isloggedin && page.path === "/AddService") {
          return;
        }
        if (!user.isloggedin && page.path === "/requests") {
          return;
        }
        if (user.email_active === "No" && page.path === "/AddService") {
          return;
        }
        if (user.email_active === "No" && page.path === "/requests") {
          return;
        }
        if (user.is_specialist === "true" && page.path === "/AddService") {
          return;
        }
        if (user.is_specialist === "false" && page.path === "/requests") {
          return;
        }
        if (page.path.includes("booking") && !user.isloggedin) {
          return;
        }
        if (page.path.includes("booking") && user.email_active === "No") {
          return;
        }
        return (
          <Button
            key={index}
            style={{
              color:
                location.pathname.split("/")[1] === page.path.split("/")[1]
                  ? "#ff9300"
                  : "#000",
            }}
            onClick={() => {
              setMobileOpen(false);
            }}
          >
            <Link to={page.path}>{page.name}</Link>
          </Button>
        );
      })}

      <div
        style={{
          fontSize: "14px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <select
          className={styles.select}
          onChange={handleLanguageChange}
          value={lang.lang}
        >
          <option value={"en"}>EN</option>
          <option value={"ar"}>AR</option>
          <option value={"eg"}>EG</option>
        </select>
      </div>
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
            padding: "20px",
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
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "right" }}>
                <Link className="logo" to={"/"}>
                  Logo
                </Link>
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
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: ".5em",
                }}
              >
                {pages.map((page, index) => {
                  if (!user.isloggedin && page.path === "/AddService") {
                    return;
                  }
                  if (!user.isloggedin && page.path === "/requests") {
                    return;
                  }
                  if (
                    user.email_active === "No" &&
                    page.path === "/AddService"
                  ) {
                    return;
                  }
                  if (user.email_active === "No" && page.path === "/requests") {
                    return;
                  }
                  if (
                    user.is_specialist === "true" &&
                    page.path === "/AddService"
                  ) {
                    return;
                  }
                  if (
                    user.is_specialist === "false" &&
                    page.path === "/requests"
                  ) {
                    return;
                  }
                  if (page.path.includes("booking") && !user.isloggedin) {
                    return;
                  }
                  if (
                    page.path.includes("booking") &&
                    user.email_active === "No"
                  ) {
                    return;
                  }
                  return (
                    <Button
                      style={{
                        color:
                          location.pathname.split("/")[1] ===
                          page.path.split("/")[1]
                            ? "#ff9300"
                            : "#000",
                      }}
                      key={index}
                      color="inherit"
                    >
                      <Link to={page.path}>{page.name}</Link>
                    </Button>
                  );
                })}
              </div>
              <div
                style={{
                  width: "33%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <select
                    className={styles.select}
                    onChange={handleLanguageChange}
                    value={lang.lang}
                  >
                    <option value={"en"}>EN</option>
                    <option value={"ar"}>AR</option>
                    <option value={"eg"}>EG</option>
                  </select>
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
