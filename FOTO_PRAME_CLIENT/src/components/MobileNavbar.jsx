import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Tooltip from "@mui/material/Tooltip";
import { TextField, InputAdornment, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ThemeContext from "../context/ThemeContext";

const MobileNavbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const { currentTheme } = useContext(ThemeContext);
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      mt={10}
      alignItems={"center"}
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

      <Link to="/create-pin">
        <Tooltip title="Add a pin">
          <IconButton aria-label="menu">
            <AddToPhotosOutlinedIcon
              sx={{ color: currentTheme.palette.color.default }}
            />
          </IconButton>
        </Tooltip>
      </Link>
    </Stack>
  );
};

export default MobileNavbar;
