import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Tooltip from "@mui/material/Tooltip";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  TextField,
  InputAdornment,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ThemeContext from "../context/ThemeContext";
const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  if (!user) return null;
  return (
    <AppBar sx={{ padding: 2 }} color="default" elevation={0}>
      <Toolbar
        variant="regular"
        sx={{ justifyContent: "space-between", gap: 2 }}
      >
        <Link to="/">
          <Typography variant="h1" fontSize={28} letterSpacing={2}>
            FOTOPRAME
          </Typography>
        </Link>

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

        <Box display={"flex"} gap={"8px"} alignItems={"center"}>
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
              <LazyLoadImage
                alt="profile-logo"
                effect="blur"
                src={user?.image}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </Link>
          </Tooltip>

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
