import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";
import { Box, Typography } from "@mui/material";
const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
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
  }, [searchTerm]);

  return (
    <Box padding={4}>
      {loading && <Spinner message="Searching for pins..." />}
      {pins?.length > 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography
            variant="caption"
            fontWeight="semiBold"
            textTransform={"capitalize"}
            fontSize={18}
          >
            No Pins Found!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Search;
