import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
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
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          margin: 0;
          padding: 0;
        }
        *::-webkit-scrollbar {
          width: 10px;
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
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          scroll-behavior: smooth; /* Smooth scrolling */
        }
      `,
    },
  },
});

const darkTheme = createTheme({
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
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          margin: 0;
          padding: 0;
        }
        *::-webkit-scrollbar {
          width: 10px;
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
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          scroll-behavior: smooth; /* Smooth scrolling */
        }
      `,
    },
  },
});

export { lightTheme, darkTheme };
