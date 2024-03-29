import { useState, useEffect, useContext, lazy, Suspense } from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Hidden,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import { client } from "../client";
import * as jwtDecode from "jwt-decode";
import { userQuery } from "../utils/data";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IconButton from "@mui/material/IconButton";
import ThemeContext from "../context/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import { fetchUser } from "../utils/fetchUser";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
const LazyUserProfile = lazy(() => import("../components/UserProfile"));
const LazyPins = lazy(() => import("./Pins"));
const Home = () => {
  const [user, setUser] = useState(null);
  const { toggleTheme, currentTheme } = useContext(ThemeContext);

  // Managing state and function for notifications
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const { vertical, horizontal, open, message } = state;
  const handleCloseAlert = () => {
    setState({ ...state, open: false, message: "" });
  };

  const generateAlert = (msg) => {
    const newState = { vertical: "top", horizontal: "center" };
    setState({
      ...newState,
      open: true,
      message: msg,
    });
  };

  //End of notification actions

  const userInfo = fetchUser();
  let decodedToken;

  if (userInfo !== null) {
    decodedToken = jwtDecode.jwtDecode(userInfo);
  }

  const { sub } = decodedToken || {};

  useEffect(() => {
    const query = userQuery(sub);
    client
      .fetch(query)
      .then((data) => {
        setUser(data[0]);
        generateAlert(`Click to like`);
      })
      .catch((err) => {
        generateAlert(`Error: ${err}`);
      });
  }, []);

  return (
    <>
      <CssBaseline />

      {/* For mobile view */}
      <Box>
        <Hidden mdUp>
          {/* Mobile navbar */}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={2000}
            onClose={handleCloseAlert}
            message={message}
            key={vertical + horizontal}
          />
          <AppBar sx={{ padding: 2 }} color="default" elevation={0}>
            <Toolbar
              variant="regular"
              sx={{ justifyContent: "space-between" }}
              disableGutters
            >
              {/* <Link to="/">
                <img src={logoPage} alt="logo" style={{ width: "150px" }} />
              </Link> */}
              <Link to="/">
                <Typography variant="h1" fontSize={28} letterSpacing={2}>
                  FOTOPRAME
                </Typography>
              </Link>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <IconButton
                  sx={{ color: currentTheme.palette.color.default }}
                  aria-label="toggle-theme"
                  onClick={toggleTheme}
                  size="large"
                >
                  {currentTheme.name === "light" ? (
                    <LightModeIcon />
                  ) : (
                    <DarkModeIcon />
                  )}
                </IconButton>
                <Link to={`user-profile/${user?._id}`}>
                  <LazyLoadImage
                    alt="profile-logo"
                    effect="blur"
                    src={user?.image}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </Link>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Mobile content */}

          <Routes>
            <Route
              path="/user-profile/:userId"
              element={
                <Suspense fallback="Loading...">
                  <LazyUserProfile />
                </Suspense>
              }
            />
            <Route
              path="/*"
              element={
                <Suspense fallback="Loading...">
                  <LazyPins user={user && user} />
                </Suspense>
              }
            />
          </Routes>
        </Hidden>
      </Box>

      {/* For larger screens */}
      <Hidden mdDown>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
          message={message}
          key={vertical + horizontal}
        />
        <Container maxWidth="xl" disableGutters>
          <Grid container>
            {/* Section with masonry layout */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Routes>
                <Route
                  path="/user-profile/:userId"
                  element={
                    <Suspense fallback="Loading...">
                      <LazyUserProfile />
                    </Suspense>
                  }
                />
                <Route
                  path="/*"
                  element={
                    <Suspense fallback="Loading...">
                      <LazyPins user={user && user} />
                    </Suspense>
                  }
                />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Hidden>
    </>
  );
};

export default Home;
