import { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./containers/Home";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { fetchUser } from "./utils/fetchUser";

// Create a new context
export const ThemeContext = createContext();

function App() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
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
  useEffect(() => {
    const savedTheme = localStorage.getItem("fotoprame-mode");
    if (savedTheme) {
      if (savedTheme === "darkTheme") {
        setCurrentTheme(darkTheme);
      }
    }
  }, []);
  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate("/login");
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
