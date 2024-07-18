import { Box } from "@mui/material";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
  isLoggedIn: boolean;
};

const MainLayout = ({ children, isLoggedIn }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <Navbar isLoggedIn={isLoggedIn} />
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
    </Box>
  );
};

export default MainLayout;
