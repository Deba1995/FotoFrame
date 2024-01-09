import { Box, Typography, Avatar } from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";
import { categories } from "../utils/data";
const Sidebar = ({ handleSidebarClose, user }) => {
  const activeStyle = {
    color: "red", // Change this to your desired active color
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          pt: 3,
          pl: 2,
          justifyContent: "space-between",
        }}
      >
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? activeStyle : { textDecoration: "none" }
          }
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <HomeIcon />
            <Typography variant="h2">Home</Typography>
          </Box>
        </NavLink>
        <Typography variant="h2">Discover Categories</Typography>
        {categories.slice(0, categories.length - 1).map((category) => (
          <NavLink
            to={`/category/${category.name}`}
            style={({ isActive }) =>
              isActive
                ? activeStyle
                : {
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }
            }
            onClick={handleSidebarClose}
            key={category.name}
          >
            <Avatar alt="profile-logo" src={category?.image} />
            <Typography variant="body1">{category.name}</Typography>
          </NavLink>
        ))}
        <Box>
          {user && (
            <Link
              to={`user-profile/${user?._id}`}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
                marginBottom: "3px",
                gap: "8px",
                textDecoration: "none",
                background: "white",
              }}
              onClick={handleSidebarClose}
            >
              <img
                src={user?.image}
                alt="user-profile"
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
              <Typography variant="caption">{user?.userName}</Typography>
              <ArrowForwardIosIcon sx={{ color: "#000" }} />
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
