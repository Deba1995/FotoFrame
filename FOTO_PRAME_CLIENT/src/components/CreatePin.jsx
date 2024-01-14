import { useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  TextField,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImageAsset(doc);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Image upload error", err);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };

      client.create(doc).then(() => navigate("/"));
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={6}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
        >
          <Box
            padding={2}
            borderColor="grey.500"
            borderRadius={2}
            width={400}
            height={400}
            cursor="pointer"
            bgcolor="#F9F5F6"
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            {loading && <Spinner />}
            {wrongImageType && (
              <Typography variant="caption">Wrong image type</Typography>
            )}
            {!imageAsset ? (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  onClick={() => fileInputRef.current.click()}
                >
                  <CloudUploadTwoToneIcon />
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    name="upload-image"
                    onChange={uploadImage}
                  />
                  <Typography variant="body1">Click to upload</Typography>
                </Box>
                <Typography variant="caption">
                  Use high-quality JPG, SVG, PNG, GIF, or TIFF less than 20MB
                </Typography>
              </>
            ) : (
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                }}
              >
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setImageAsset(null)}
                  sx={{
                    position: "absolute",
                    bottom: 3,
                    right: 3,
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
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={2} marginTop={5}>
          {fields && (
            <Grid item xs={12} lg={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="caption">
                  Please fill in all the fields
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} lg={12}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap={"8px"}
            >
              <TextField
                id="title"
                variant="outlined"
                placeholder="Add Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
                fullWidth
              ></TextField>
              {user && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    padding: "2px",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={user.image}
                    alt="user-profile"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="caption">{user.userName}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              id="about"
              variant="outlined"
              placeholder="What is your pin about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              size="small"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              id="destination"
              variant="outlined"
              placeholder="Add a destination link"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              size="small"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Select
              id="select-pin-category"
              value={category || ""}
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return "Choose Pin category"; // Placeholder
                }
                return selected;
              }}
              fullWidth
              size="small"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="other">
                <em>Select Category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem value={category.name} key={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Button
              variant="contained"
              color="error"
              onClick={savePin}
              style={{
                borderRadius: "14px",
              }}
            >
              Save Pin
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreatePin;
