import { Box, Container } from "@mui/material";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
  isLoggedIn: boolean;
  setLogIn: (val: boolean) => void;
};

const MainLayout = ({ children, isLoggedIn, setLogIn }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        bgcolor: "#d0f4de",
        maxHeight: "100vh",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          border: "0.5rem solid #a9def9",
          borderRadius: "2rem",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar isLoggedIn={isLoggedIn} setLogIn={setLogIn} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
