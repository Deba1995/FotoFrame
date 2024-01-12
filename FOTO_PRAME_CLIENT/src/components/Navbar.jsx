import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hidden from "@mui/material/Hidden";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Tooltip from "@mui/material/Tooltip";
import {
  TextField,
  InputAdornment,
  Box,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { logoPage } from "../assets";
import { ThemeContext } from "../App";
const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  if (!user) return null;
  return (
    <AppBar sx={{ padding: 2 }} color="default" elevation={0}>
      <Toolbar variant="regular" sx={{ justifyContent: "space-between" }}>
        <Hidden mdDown>
          <Box>
            <Link to="/">
              <img src={logoPage} alt="logo" style={{ width: "150px" }} />
            </Link>
          </Box>
        </Hidden>
        <Box
          sx={{
            width: "80%", // Default width for xs, sm, and md screens

            // Media query for lg and xl screens
            "@media (min-width: 1280px)": {
              width: "60%",
            },
          }}
        >
          <TextField
            id="search"
            type="search"
            onFocus={() => navigate("/search")}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </Box>
        <Box display={"flex"} gap={"8px"} alignItems={"center"}>
          <Hidden mdDown>
            <Tooltip title="Toggle">
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
            </Tooltip>

            <Tooltip title="Profile">
              <Link to={`user-profile/${user?._id}`}>
                <img
                  alt="profile-logo"
                  src={user?.image}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  loading="lazy"
                />
              </Link>
            </Tooltip>
          </Hidden>
          <Link to="/create-pin">
            <Tooltip title="Add a pin">
              <IconButton aria-label="menu">
                <AddToPhotosOutlinedIcon
                  sx={{ color: currentTheme.palette.color.default }}
                />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
