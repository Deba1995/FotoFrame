import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./containers/Home";
import ThemeContext from "./context/ThemeContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  // Function to change current theme
  const toggleTheme = () => {
    if (currentTheme.name === "light") {
      setCurrentTheme(darkTheme);
      localStorage.setItem("fotoprame-mode", "darkTheme");
    } else {
      setCurrentTheme(lightTheme);
      localStorage.setItem("fotoprame-mode", "lightTheme");
    }
  };
  const navigate = useNavigate();

  // Fetching user set theme mode from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("fotoprame-mode");
    if (savedTheme) {
      if (savedTheme === "darkTheme") {
        setCurrentTheme(darkTheme);
      }
    }
  }, []);

  // Fetching user information from local storage
  useEffect(() => {
    try {
      const user = fetchUser();
      if (!user) navigate("/login");
    } catch (error) {
      console.error("Error fetching user", error);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
