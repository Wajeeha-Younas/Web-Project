import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Home() {
  const navigate = useNavigate(); 

  const goToDashboard = () => {
    navigate("/dashboard"); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={goToDashboard}
        sx={{ fontSize: 24, px: 5, py: 2 }}
      >
        Trenzy
      </Button>
    </Box>
  );
}

export default Home;