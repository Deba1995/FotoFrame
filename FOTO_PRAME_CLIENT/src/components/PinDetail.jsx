import { useState, useEffect, useContext } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import WestIcon from "@mui/icons-material/West";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Spinner from "./Spinner";
import ThemeContext from "../context/ThemeContext";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import {
  Box,
  Grid,
  Link,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Tooltip,
  Hidden,
  SvgIcon,
} from "@mui/material";
const PinDetail = ({ user }) => {
  const { currentTheme } = useContext(ThemeContext);
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
              _ref: user?._id,
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
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box
          sx={{ display: "flex" }}
          justifyContent={"center"}
          position={"relative"}
          flexWrap={"wrap"}
        >
          <Hidden mdDown>
            <Box
              sx={{
                position: "absolute",
                top: 18,
                left: 50,
              }}
            >
              <RouterLink to="/">
                <Tooltip title="Back">
                  <IconButton aria-label="back">
                    <SvgIcon
                      style={{
                        stroke: currentTheme.palette.color.default,
                        strokeWidth: 2,
                      }}
                    >
                      <WestIcon />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              </RouterLink>
              <Hidden xlDown>
                <Typography
                  variant="h1"
                  fontSize={"24px"}
                  display={"inline-block"}
                  ml={2}
                >
                  For you
                </Typography>
              </Hidden>
            </Box>
          </Hidden>

          {/* Box with image left section*/}
          <LazyLoadImage
            src={pinDetail?.image && urlFor(pinDetail.image).width(510).url()}
            alt="user-post"
            style={{
              borderTopLeftRadius: "32px",
              borderBottomLeftRadius: "32px",
              maxWidth: "100%",
              height: "auto",
            }}
          />
          {/* Box with right section*/}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            paddingTop={2}
            paddingLeft={3}
            paddingRight={3}
            flexDirection={"column"}
            gap={"12px"}
            width={510}
            borderRadius="0 32px 32px 0"
            boxShadow="5px 5px 5px rgba(0, 0, 0, 0.2)"
          >
            {/* Box with download and link destination */}
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
            {/* Image title */}
            <Typography
              variant="h1"
              display={"block"}
              gutterBottom
              sx={{
                fontSize: "38px",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                textTransform: "capitalize",
              }}
            >
              {pinDetail.title}
            </Typography>
            {/* Image about */}
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
            {/* Profile link */}
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
              <LazyLoadImage
                alt="user-profile"
                effect="blur"
                src={pinDetail?.postedBy?.image}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <Typography variant="caption" textTransform={"capitalize"}>
                {pinDetail?.postedBy?.userName}
              </Typography>
            </RouterLink>
            {/* Comments header */}
            <Typography
              variant="caption"
              fontWeight="semiBold"
              textTransform={"capitalize"}
              fontSize={18}
            >
              Comments
            </Typography>
            {/* Comment section */}
            <Box sx={{ maxHeight: "300px", overflowY: "auto", flexGrow: 1 }}>
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
            {/* User profile and add comment */}
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              alignItems={"center"}
              marginTop={6}
              position={"sticky"}
              bottom={0}
              bgcolor={currentTheme.palette.background.default}
            >
              <RouterLink to={`/user-profile/${user?._id}`}>
                <LazyLoadImage
                  alt="user-profile"
                  effect="blur"
                  src={user?.image}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
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
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {pins?.length > 0 ? (
          <>
            <Box
              marginTop={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="caption" fontWeight="semiBold" fontSize={18}>
                More to explore
              </Typography>
            </Box>
            <MasonryLayout pins={pins} />
          </>
        ) : (
          <Spinner message="Loading more pins..." />
        )}
      </Grid>
    </Grid>
  );
};

export default PinDetail;
