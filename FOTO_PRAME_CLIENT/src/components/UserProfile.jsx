import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { googleLogout } from "@react-oauth/google";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import {
  Grid,
  Avatar,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => setPins(data));
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => setPins(data));
    }
  }, [text, userId]);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{ height: 500 }}
            image={randomImage}
            title="banner-image"
          />
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Avatar
              alt="user-image"
              src={user.image}
              sx={{ position: "absolute", bottom: -30, height: 80, width: 80 }}
            />
          </Box>
          <IconButton
            aria-label="send"
            size="large"
            onClick={handleLogout}
            sx={{
              position: "absolute",
              top: 2,
              right: 2,
              backgroundColor: "white",
            }}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={5}
        >
          <Typography
            variant="h1"
            display={"block"}
            gutterBottom
            sx={{
              fontSize: "28px",
              wordWrap: "break-word", // Add this line
              overflowWrap: "break-word",
              textTransform: "capitalize",
            }}
          >
            {user.userName}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <Button
            variant={activeBtn === "created" ? "contained" : ""}
            color="error"
            style={{
              borderRadius: "14px",
            }}
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
          >
            Created
          </Button>
          <Button
            variant={activeBtn === "saved" ? "contained" : ""}
            color="error"
            style={{
              borderRadius: "14px",
            }}
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
          >
            Saved
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {pins?.length ? (
          <MasonryLayout pins={pins} />
        ) : (
          <Typography
            variant="caption"
            fontWeight="semiBold"
            textTransform={"capitalize"}
            fontSize={18}
          >
            No Pins Found!
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default UserProfile;
