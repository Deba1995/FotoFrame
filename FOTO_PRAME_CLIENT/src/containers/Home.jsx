import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Hidden } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import * as jwtDecode from "jwt-decode";
import { userQuery } from "../utils/data";
import logo from "../assets/logo.jpg";
import Pins from "./Pins";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const userInfo = fetchUser();
  let decodedToken;

  if (userInfo !== null) {
    decodedToken = jwtDecode.jwtDecode(userInfo);
  }

  const { sub } = decodedToken || {};

  useEffect(() => {
    const query = userQuery(sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <>
      <CssBaseline />

      {/* For mobile view */}
      <Box>
        <Hidden mdUp>
          {/* Mobile navbar */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              height: "60px",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon sx={{ fontSize: 40, color: "#000" }} />
            </IconButton>
            <Link to="/">
              <img src={logo} alt="logo" style={{ width: "150px" }} />
            </Link>
            <Link to={`user-profile/${user?._id}`} style={{ width: "60px" }}>
              <Avatar alt="profile-logo" src={user?.image} />
            </Link>
          </Box>

          {/* Mobile content */}
          <Box>
            <Routes>
              <Route path="/user-profile/:userId" element={<UserProfile />} />
              <Route path="/*" element={<Pins user={user && user} />} />
            </Routes>
          </Box>
        </Hidden>

        {/* Mobile sidebar */}
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          transitionDuration={{ enter: 300, exit: 200 }}
          PaperProps={{
            sx: { width: 360 }, // Increase this value to increase the width of the Drawer
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "4px",
              paddingLeft: "12px",
            }}
          >
            <Link to="/" onClick={handleDrawerClose}>
              <img src={logo} alt="logo" style={{ width: "150px" }} />
            </Link>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Sidebar handleSidebarClose={handleDrawerClose} user={user && user} />
        </Drawer>
      </Box>

      {/* For larger screens */}
      <Hidden mdDown>
        <Container
          maxWidth="xl"
          sx={{ paddingTop: 2, paddingLeft: 2 }}
          disableGutters
        >
          <Grid container spacing={2}>
            {/* Left section with sidebar */}
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              xl={2}
              sx={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: 0,
                overflowY: "auto",
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Your logo and other content */}
                <Link to="/" onClick={handleDrawerClose}>
                  {!loaded && (
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#f0f0f0", // Placeholder background color
                      }}
                    >
                      Loading...
                    </Box>
                  )}
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "150px" }}
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                  />
                </Link>

                <Sidebar user={user && user} />
              </Box>
            </Grid>

            {/* Right section with masonry layout */}
            <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
              <Box>
                <Routes>
                  <Route
                    path="/user-profile/:userId"
                    element={<UserProfile />}
                  />
                  <Route path="/*" element={<Pins user={user && user} />} />
                </Routes>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Hidden>
    </>
  );
};

export default Home;
