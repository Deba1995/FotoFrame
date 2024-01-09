import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import { Box } from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Container from "@mui/material/Container";
import shareVideo from "../assets/loginvideo.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";
const Login = () => {
  const navigate = useNavigate();
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
      navigate("/", { replace: true });
    });
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
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Login;
