import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Badge,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";

import { client, urlFor } from "../client";
import DeleteIcon from "@mui/icons-material/Delete";
import * as jwtDecode from "jwt-decode";
import { fetchUser } from "../utils/fetchUser";
import DownloadForOffline from "@mui/icons-material/DownloadForOffline";

const Pin = ({ pin: { postedBy, image, _id, save }, onLoad }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
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
    <>
      <Box
        position="relative"
        marginTop={1.7}
        marginLeft={0.7}
        maxHeight={"100%"}
        sx={{
          borderRadius: "10px",
          cursor: postHovered ? "zoom-in" : "pointer",
          transition: "transform .5s, box-shadow 1s",
          transform: postHovered ? "scale(1.02)" : "none",
          boxShadow: postHovered ? "0 10px 10px rgba(0,0,0,.7)" : "none",
        }}
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        {/* Pin Image */}
        {!loaded && (
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f0f0f0", // Placeholder background color
            }}
          >
            Loading...
          </Box>
        )}
        <img
          src={urlFor(image).width(350).url()}
          alt="user-post"
          style={{
            objectFit: "cover",
            borderRadius: "10px",
            width: "100%",
            display: "block",
          }}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        {loaded && (
          <>
            {/* Download Image */}
            <Tooltip title="Download">
              <IconButton
                href={`${image?.asset?.url}?dl=`}
                aria-label="download"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0.7,
                  transition: "opacity 0.3s ease",
                  ":hover": {
                    opacity: 1,
                  },
                }}
              >
                <DownloadForOffline color="error" fontSize="large" />
              </IconButton>
            </Tooltip>
            {/* Save Image */}
            {alreadySaved ? (
              <Tooltip title="Pinned">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  aria-label="saved"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    opacity: 0.7,
                    transition: "opacity 0.3s ease",
                    ":hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <Badge badgeContent={save?.length} color="error">
                    <PushPinIcon color="error" fontSize="large" />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Pin">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  aria-label="save"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    opacity: 0.7,
                    transition: "opacity 0.3s ease",
                    ":hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <PushPinIcon color="error" fontSize="large" />
                </IconButton>
              </Tooltip>
            )}

            {/* Profile Link */}
            <RouterLink
              to={`/user-profile/${postedBy?._id}`}
              style={{
                textDecoration: "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
                sx={{
                  position: "absolute",
                  bottom: 2,
                  left: 2,
                  borderRadius: "10px",
                }}
              >
                <Avatar alt="user-profile" src={postedBy?.image} />
                <Typography
                  variant="caption"
                  fontWeight="semiBold"
                  color={"#fff"}
                  sx={{
                    wordWrap: "break-word", // Add this line
                    overflowWrap: "break-word",
                    textTransform: "capitalize",
                  }}
                >
                  {postedBy?.userName}
                </Typography>
              </Box>
            </RouterLink>

            {/* Remove Icon */}
            {postedBy?._id === sub && (
              <Tooltip title="Remove">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  aria-label="save"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    opacity: 0.7,
                    transition: "opacity 0.3s ease",
                    ":hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <DeleteIcon color="error" fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Pin;
