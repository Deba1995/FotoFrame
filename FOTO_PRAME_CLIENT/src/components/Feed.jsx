import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import MasonrySkeleton from "./MasonrySkeleton.jsx";
import { Stack, Typography } from "@mui/material";
import Spinner from "./Spinner.jsx";
import { feedQuery, searchQuery } from "../utils/data.js";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState(null);
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return (
      <>
        <Spinner message="We are adding new ideas to your feed!" />
        <MasonrySkeleton />
      </>
    );

  if (!pins?.length)
    return (
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Typography
          variant="caption"
          fontWeight="semiBold"
          textTransform={"capitalize"}
          fontSize={18}
        >
          No Pins Available!
        </Typography>
      </Stack>
    );

  return pins && <MasonryLayout pins={pins} />;
};

export default Feed;
