import Masonry from "@mui/lab/Masonry";
import Pin from "./Pin";
const MasonryLayout = ({ pins }) => {
  return (
    <Masonry columns={{ xs: 1, sm: 3, md: 3, lg: 4, xl: 4 }} spacing={2}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
