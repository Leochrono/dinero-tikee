import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./core/context/authContext";
import theme from "./theme";
import Routes from "./routes/routes";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: "Inter",
                background: theme.palette.secondary.main,
                color: theme.palette.common.white,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "8px",
                padding: "16px",
              },
              success: {
                iconTheme: {
                  primary: theme.palette.primary.main,
                  secondary: theme.palette.common.white,
                },
              },
              error: {
                iconTheme: {
                  primary: theme.palette.error.main,
                  secondary: theme.palette.common.white,
                },
              },
            }}
          />
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
