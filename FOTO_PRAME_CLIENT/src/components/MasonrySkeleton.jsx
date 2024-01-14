import { Grid, Skeleton } from "@mui/material";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

const MasonrySkeleton = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <Grid container spacing={1} padding={2}>
      {/* Repeat the Skeleton component for each item you want to display */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <Grid item key={item} xl={3} lg={3} md={4} sm={6} xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={
              currentTheme.name === "dark"
                ? {
                    bgcolor: "grey.900",
                    width: "100%",
                    height: 330,
                    borderRadius: "10px",
                  }
                : {
                    width: "100%",
                    height: 330,
                    borderRadius: "10px",
                  }
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MasonrySkeleton;
