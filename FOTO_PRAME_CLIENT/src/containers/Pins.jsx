import { useState, lazy, Suspense } from "react";
import { Box, Grid, Hidden } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../components";
const LazyFeed = lazy(() => import("../components/Feed"));
const LazyCreatePin = lazy(() => import("../components/CreatePin"));
const LazyPinDetail = lazy(() => import("../components/PinDetail"));
const LazySearch = lazy(() => import("../components/Search"));
import { Navbar, MobileNavbar } from "../components";
const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12} padding={4}>
        <Hidden mdDown>
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            user={user}
          />
        </Hidden>
        <Hidden mdUp>
          <MobileNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Hidden>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Box mt={3} mb={3} style={{ overflowX: "auto" }}>
          <Sidebar />
        </Box>
      </Grid>

      <Grid item xs={12} lg={12}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback="Loading...">
                <LazyFeed />
              </Suspense>
            }
          />
          <Route
            path="/category/:categoryId"
            element={
              <Suspense fallback="Loading...">
                <LazyFeed />
              </Suspense>
            }
          />
          <Route
            path="/pin-detail/:pinId"
            element={
              <Suspense fallback="Loading...">
                <LazyPinDetail user={user} />
              </Suspense>
            }
          />
          <Route
            path="/create-pin"
            element={
              <Suspense fallback="Loading...">
                <LazyCreatePin user={user} />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback="Loading...">
                <LazySearch
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </Suspense>
            }
          />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Pins;
