import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { categories } from "../utils/data";
import { useContext, useState } from "react";
import { ThemeContext } from "../App";
const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { currentTheme } = useContext(ThemeContext);
  return (
    <Stack direction="row" spacing={2} padding={2}>
      <NavLink to="/">
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          color="error"
          size="small"
          onClick={() => setSelectedCategory("")}
          sx={{ color: currentTheme.palette.color.default }}
        >
          Home
        </Button>
      </NavLink>
      {categories.slice(0, categories.length - 1).map((category) => (
        <NavLink to={`/category/${category.name}`} key={category.name}>
          <Button
            variant="outlined"
            color="error"
            sx={{ color: currentTheme.palette.color.default }}
            size={selectedCategory === category.name ? "large" : "small"}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </Button>
        </NavLink>
      ))}
    </Stack>
  );
};

export default Sidebar;
