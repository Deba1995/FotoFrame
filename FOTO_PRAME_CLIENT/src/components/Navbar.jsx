import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hidden from "@mui/material/Hidden";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Tooltip from "@mui/material/Tooltip";
import {
  Avatar,
  TextField,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  if (!user) return null;
  return (
    <>
      <Box sx={{ width: "80%" }}>
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
          <Tooltip title="Profile">
            <Link to={`user-profile/${user?._id}`}>
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
                alt="profile-logo"
                src={user?.image}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                onLoad={() => setLoaded(true)}
                loading="lazy"
              />
            </Link>
          </Tooltip>
        </Hidden>
        <Link to="/create-pin">
          <Tooltip title="Add a pin">
            <IconButton color="inherit" aria-label="menu">
              <AddToPhotosOutlinedIcon
                sx={{
                  color: "black",
                  fontSize: 32,
                }}
              />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    </>
  );
};

export default Navbar;
