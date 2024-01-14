import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Badge,
  Snackbar,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import ShareIcon from "@mui/icons-material/Share";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { client, urlFor } from "../client";
import DeleteIcon from "@mui/icons-material/Delete";
import * as jwtDecode from "jwt-decode";
import { fetchUser } from "../utils/fetchUser";
import DownloadForOffline from "@mui/icons-material/DownloadForOffline";

const Pin = ({ pin: { postedBy, image, _id, save, destination } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();
  const decodedToken = jwtDecode.jwtDecode(user);
  const { sub } = decodedToken;
  const alreadySaved = !!save?.filter((post) => post?.postedBy?._id === sub)
    ?.length;

  // Managing state and function for notifications
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const { vertical, horizontal, open, message } = state;
  const handleCloseAlert = () => {
    setState({ ...state, open: false, message: "" });
  };

  const generateAlert = (msg) => {
    const newState = { vertical: "top", horizontal: "center" };
    setState({
      ...newState,
      open: true,
      message: msg,
    });
  };

  //End of notification actions

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

  const handleShareClick = (e, url) => {
    e.stopPropagation();

    try {
      navigator.clipboard.writeText(url);
      generateAlert("Link copied to clipboard!");
    } catch (error) {
      generateAlert("Failed to copy link to clipboard:", error);
    }
  };

  return (
    <Box
      position="relative"
      margin={1}
      sx={{
        cursor: postHovered ? "zoom-in" : "pointer",
        overflow: "hidden",
      }}
      onMouseEnter={() => setPostHovered(true)}
      onMouseLeave={() => setPostHovered(false)}
      onClick={() => navigate(`/pin-detail/${_id}`)}
    >
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        message={message}
        key={vertical + horizontal}
      />
      {/* Pin Image */}
      <Box sx={{ width: "100%", maxHeight: "510px" }}>
        <LazyLoadImage
          src={urlFor(image).width(350).format("webp").url()}
          alt="user-post"
          width={350}
          loading="lazy"
          height={"100%"}
          style={{
            objectFit: "cover",

            display: "block",
            transition: "transform .5s", // Add transition here
            transform: postHovered ? "scale(1.02)" : "none",
            transformOrigin: "center",
          }}
        />
      </Box>
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
            <DownloadForOffline sx={{ color: grey[50] }} />
          </IconButton>
        </Tooltip>

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
            gap={1}
            sx={{
              position: "absolute",
              bottom: 2,
              left: 2,
              borderRadius: "10px",
            }}
          >
            {/* <Avatar alt="user-profile" src={postedBy?.image} /> */}
            <LazyLoadImage
              alt="postedBy-profile-logo"
              effect="blur"
              src={postedBy?.image}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <Typography
              variant="caption"
              fontWeight="semiBold"
              color={"#fff"}
              sx={{
                textTransform: "capitalize",
              }}
            >
              {postedBy?.userName.length > 15
                ? `${postedBy?.userName.slice(0, 15)}...`
                : postedBy?.userName}
            </Typography>
          </Box>
        </RouterLink>

        {/* Box to display Pin and Trash button */}
        <Box
          display={"flex"}
          flexDirection={"column"}
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
          {/* Conditionally rendering pin icon */}
          {alreadySaved ? (
            <Tooltip title="Pinned">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Badge badgeContent={save?.length} color="error">
                  <PushPinIcon color="error" />
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
              >
                <PushPinIcon sx={{ color: grey[50] }} />
              </IconButton>
            </Tooltip>
          )}
          {/* Comment icon */}
          <RouterLink
            to={`/pin-detail/${_id}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Tooltip title="Comment">
              <IconButton>
                <ChatBubbleOutlineOutlinedIcon sx={{ color: grey[50] }} />
              </IconButton>
            </Tooltip>
          </RouterLink>
          {/* Share icon */}
          <Tooltip title="Share">
            <IconButton onClick={(e) => handleShareClick(e, destination)}>
              <ShareIcon sx={{ color: grey[50] }} />
            </IconButton>
          </Tooltip>
          {/* Delete Icon if current user */}
          {postedBy?._id === sub && (
            <Tooltip title="Remove">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  deletePin(_id);
                }}
                aria-label="remove"
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </>
    </Box>
  );
};

export default Pin;
