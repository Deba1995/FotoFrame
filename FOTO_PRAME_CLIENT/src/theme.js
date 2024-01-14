import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  name: "light",
  typography: {
    fontFamily: ["'Roboto', 'Open Sans', sans-serif"].join(","),
    h1: {
      fontWeight: "bold",
      color: "#333",
    },
    h2: {
      fontWeight: 600,
      color: "#555",
      fontSize: "18px",
    },
    body1: {
      fontWeight: 600,
      color: "#777",
    },
    caption: {
      fontWeight: "semiBold",
      color: "#111",
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
    },
    color: {
      default: "#121212",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          margin: 0;
          padding: 0;
        }
        *::-webkit-scrollbar {
          display: none; // Adjust the width as needed // none to hide
        }
        *::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        *::-webkit-scrollbar-thumb {
          background: #bbb;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        * {
          -ms-overflow-style: none; // Show the scrollbar for IE and Edge  //none to hide
          scrollbar-width: auto; // Show the scrollbar for Firefox
          scroll-behavior: smooth; // Smooth scrolling
        }
      `,
    },
  },
});

const darkTheme = createTheme({
  name: "dark",
  typography: {
    fontFamily: ["'Roboto', 'Open Sans', sans-serif"].join(","),
    h1: {
      fontWeight: 700,
      color: "#fff",
    },
    h2: {
      fontWeight: 600,
      color: "#ddd",
      fontSize: "18px",
    },
    body1: {
      fontWeight: 600,
      color: "#bbb",
    },
    caption: {
      fontWeight: 300,
      color: "#aaa",
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    color: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          margin: 0;
          padding: 0;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        *::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        *::-webkit-scrollbar-thumb {
          background: #888;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        * {
          -ms-overflow-style: none; // Show the scrollbar for IE and Edge  //none to hide
          scrollbar-width: auto; // Show the scrollbar for Firefox
          scroll-behavior: smooth; // Smooth scrolling
        }
      `,
    },
  },
});

export { lightTheme, darkTheme };
