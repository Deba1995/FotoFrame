import React, { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../components";
import { Navbar, Feed, PinDetail, CreatePin, Search } from "../components";
const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12} padding={4}>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
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
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Pins;
