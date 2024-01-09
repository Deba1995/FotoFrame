import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./containers/Home";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate("/login");
  }, []);
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
