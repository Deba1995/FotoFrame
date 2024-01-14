import Masonry from "react-masonry-css";
import Pin from "./Pin";
import "./masonry.css";
import { Box } from "@mui/material";
const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 4,
  1000: 3,
  500: 2,
};

const MasonryLayout = ({ pins }) => {
  return (
    <Box padding={2}>
      <Masonry breakpointCols={breakpointColumnsObj} className="masonry-layout">
        {pins?.map((pin) => (
          <Pin key={pin._id} pin={pin} />
        ))}
      </Masonry>
    </Box>
  );
};

export default MasonryLayout;
