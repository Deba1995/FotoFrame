import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import Spinner from "./Spinner";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import {
  Box,
  Grid,
  Link,
  Typography,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message="Loading pin..." />;

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={5}
        >
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).width(500).url()}
            alt="user-post"
            style={{ borderRadius: "32px" }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          paddingTop={10}
          paddingLeft={3}
          paddingRight={3}
          flexDirection={"column"}
          gap={"12px"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Link
              href={`${pinDetail.image?.asset?.url}?dl=`}
              download={true}
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
            <Link
              href={`${pinDetail.destination}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                opacity: 0.75,
                transition: "opacity 0.3s ease",
                textDecoration: "none",
                ":hover": {
                  opacity: 1,
                },
              }}
            >
              <Typography
                variant="caption"
                display={"block"}
                gutterBottom
                sx={{
                  fontSize: "14px",
                }}
              >
                {pinDetail.destination.length > 20
                  ? pinDetail.destination.slice(8, 35)
                  : pinDetail.destination.slice(8)}
              </Typography>
            </Link>
          </Box>

          <Typography
            variant="h1"
            display={"block"}
            gutterBottom
            sx={{
              fontSize: "38px",
              wordWrap: "break-word", // Add this line
              overflowWrap: "break-word",
              textTransform: "capitalize",
            }}
          >
            {pinDetail.title}
          </Typography>

          <Typography
            variant="caption"
            display={"block"}
            gutterBottom
            sx={{
              fontSize: "18px",
              wordWrap: "break-word", // Add this line
              overflowWrap: "break-word",
            }}
          >
            {pinDetail.about}
          </Typography>

          <RouterLink
            to={`/user-profile/${pinDetail?.postedBy?._id}`}
            style={{
              display: "flex",
              marginTop: "5px",
              gap: "18px",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Avatar alt="user-profile" src={pinDetail?.postedBy?.image} />
            <Typography variant="caption" textTransform={"capitalize"}>
              {pinDetail?.postedBy?.userName}
            </Typography>
          </RouterLink>

          <Typography
            variant="caption"
            fontWeight="semiBold"
            textTransform={"capitalize"}
            fontSize={18}
          >
            Comments
          </Typography>

          <Box maxHeight={270} sx={{ overflowY: "auto" }}>
            {pinDetail?.comments?.map((comment, i) => (
              <Box
                display={"flex"}
                gap={2}
                marginTop={5}
                alignItems={"center"}
                borderRadius={5}
                key={i}
              >
                <Avatar alt="user-profile" src={comment.postedBy?.image} />
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography
                    variant="caption"
                    textTransform={"capitalize"}
                    fontSize={18}
                  >
                    {comment.postedBy.userName}
                  </Typography>
                  <Typography>{comment.comment}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            alignItems={"center"}
            marginTop={6}
          >
            <RouterLink to={`/user-profile/${user._id}`}>
              <Avatar alt="user-profile" src={user.image} />
            </RouterLink>
            <TextField
              multiline
              rows={1}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              placeholder="Add a comment..."
              sx={{
                flex: 1,
                borderColor: "gray.100",
                outline: "none",
                borderWidth: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "32px",
                  },
                },
                p: 2,
                "&:focus": {
                  borderColor: "gray.300",
                },
              }}
            />

            <IconButton aria-label="send" size="large" onClick={addComment}>
              {addingComment ? (
                <CircularProgress />
              ) : (
                <SendIcon fontSize="large" />
              )}
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {pins?.length > 0 ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            marginTop={5}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ textAlign: "center" }}
            gap={5}
          >
            <Typography
              variant="caption"
              fontWeight="semiBold"
              textTransform={"capitalize"}
              fontSize={18}
            >
              More like this
            </Typography>
            <MasonryLayout pins={pins} />
          </Box>
        ) : (
          <Spinner message="Loading more pins..." />
        )}
      </Grid>
    </Grid>
  );
};

export default PinDetail;
