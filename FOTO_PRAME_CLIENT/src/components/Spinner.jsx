import { Box, Typography } from "@mui/material";
import React from "react";
import { Hourglass } from "react-loader-spinner";
const Spinner = ({ message }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={5}
    >
      <Hourglass
        visible={true}
        height="30"
        width="30"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#e15b64", "#e15b64"]}
      />
      <Typography variant="subtitle2">{message}</Typography>
    </Box>
  );
};

export default Spinner;
