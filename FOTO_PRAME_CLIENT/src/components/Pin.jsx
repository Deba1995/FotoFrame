import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { client, urlFor } from "../client";
import OutboundIcon from "@mui/icons-material/Outbound";
import DeleteIcon from "@mui/icons-material/Delete";
import * as jwtDecode from "jwt-decode";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();
  const decodedToken = jwtDecode.jwtDecode(user);
  const { sub } = decodedToken;
  const alreadySaved = !!save?.filter((post) => post?.postedBy?._id === sub)
    ?.length;
  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: sub,
            postedBy: {
              _type: "postedBy",
              _ref: sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  return (
    <Box>
      <Box
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        sx={{
          width: "100%",
          position: "relative",
          cursor: postHovered ? "zoom-in" : "pointer",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <img
          src={urlFor(image).url()}
          alt="user-post"
          loading="lazy"
          style={{
            width: "100%",
            borderRadius: "10px",
          }}
        />
        {postHovered && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            sx={{
              zIndex: 50,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} gap={2}>
                <Link
                  href={`${image?.asset?.url}?dl=`}
                  download={true}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    borderRadius: "14px",
                    background: "white",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.75,
                    outline: "none",
                    transition: "opacity 0.3s ease",
                    ":hover": {
                      opacity: 1,
                      background: "white",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <DownloadForOfflineIcon style={{ color: "black" }} />
                </Link>
              </Box>
              {alreadySaved ? (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  color="error"
                  sx={{
                    opacity: 0.7,
                    transition: "opacity 0.3s ease",
                    ":hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <Typography variant="caption">
                    {save?.length} Saved
                  </Typography>
                </Button>
              ) : (
                <Box
                  sx={{
                    padding: 0.1,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    color="error"
                    sx={{
                      opacity: 0.7,
                      transition: "opacity 0.3s ease",
                      ":hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography variant="caption">Save</Typography>
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {destination && (
                <Link
                  href={destination}
                  target="_blank"
                  rel="noopener noreferrer"
                  display={"flex"}
                  alignItems={"center"}
                  gap={"5px"}
                  sx={{
                    textDecoration: "none",
                    opacity: 0.7,
                    background: "white",
                    borderRadius: "10px",
                    outline: "none",
                    fontSize: "10px",
                    transition: "opacity 0.3s ease",
                    ":hover": {
                      opacity: 1,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <OutboundIcon style={{ color: "black" }} />
                  <Typography
                    variant="caption"
                    display={"block"}
                    gutterBottom
                    sx={{
                      fontSize: "8px",
                    }}
                  >
                    {destination.length > 15
                      ? `${destination.slice(0, 15)}...`
                      : destination}
                  </Typography>
                </Link>
              )}

              {postedBy?._id === sub && (
                <Box display={"flex"}>
                  <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                    sx={{
                      marginRight: "8px",
                      marginBottom: "8px",
                      background: "white",
                      opacity: 0.7,
                      color: "white",
                      outline: "none",
                      transition: "opacity 0.3s ease",
                      ":hover": {
                        opacity: 1,
                        background: "red",
                      },
                    }}
                  >
                    <DeleteIcon style={{ color: "black" }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
      <RouterLink
        to={`user-profile/${postedBy?._id}`}
        style={{
          display: "flex",
          marginTop: "5px",
          gap: "18px",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Avatar alt="user-profile" src={postedBy?.image} />
        <Typography variant="caption" fontWeight="semiBold">
          {postedBy?.userName}
        </Typography>
      </RouterLink>
    </Box>
  );
};

export default Pin;
