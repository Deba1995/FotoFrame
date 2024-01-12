import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import { Box } from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import { shareVideo, logo } from "../assets";
import { client } from "../client";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();

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
    const newState = { vertical: "top", horizontal: "right" };
    setState({
      ...newState,
      open: true,
      message: msg,
    });
  };

  //End of notification actions

  // Succesfull login function
  const loginSuccess = (credentialResponse) => {
    const decodedToken = jwtDecode.jwtDecode(credentialResponse.credential);

    // Extract the name, ID, and imageURL from the decoded token
    const { name, sub, picture } = decodedToken;

    localStorage.setItem("user", JSON.stringify(credentialResponse.credential));
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      generateAlert("Succesfully logged in....");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    });
  };

  // Login error function

  const loginError = (err) => {
    generateAlert(`Error: ${err}`);
  };
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleCloseAlert}
          message={message}
          key={vertical + horizontal}
        />
        <Box sx={{ position: "relative", width: "100%" }}>
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center the box
            color: "white",
            fontSize: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img src={logo} width={130} alt="google-login-logo" />
          <GoogleLogin
            onSuccess={(credentialResponse) => loginSuccess(credentialResponse)}
            onError={(err) => {
              loginError(err);
            }}
          />
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Login;
