import { Box, Button, Container, Typography } from "@mui/material";
import MainLayout from "./components/MainLayout";
import { useState } from "react";
import SignIn from "./components/SignIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <Box sx={{ bgcolor: "#d0f4de", maxHeight: "100vh", minHeight: "100vh" }}>
      <Container
        sx={{
          border: "0.5rem solid #a9def9",
          borderRadius: "2rem",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MainLayout isLoggedIn={isLoggedIn}>
          {isLoggedIn ? (
            <>
              <Typography sx={{ fontSize: "2rem" }}>Logged In!</Typography>
              <Button variant="contained" color="primary">
                Click
              </Button>
            </>
          ) : (
            <SignIn />
          )}
        </MainLayout>
      </Container>
    </Box>
  );
}

export default App;
