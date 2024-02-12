import React from "react";
import { Box, Typography, Button } from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        mt: 15,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Typography
        sx={{
          fontSize: "50px",
          color: "#4c4c4c",
          maxWidth: 600,
        }}
      >
        Discover Your Next Adventure with UPlay!
      </Typography>

      <Typography
        sx={{
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
          maxWidth: 500,
          color: "#6a6a6a",
          margin: "1.5rem 0rem",
        }}
      >
        Explore a world of experiences with UPlay! From action-packed
        adventures to serene family moments, we offer a diverse range of
        activities tailored to your interests. Join the adventure with UPlay
        and enjoy exclusive benefits on your first booking. Dive into
        excitement today!
      </Typography>

      <Button
        variant="contained"
        sx={{
          padding: "1rem 2.5rem",
          backgroundColor: "#fe9e0d",
          outline: "none",
          border: "none",
          borderRadius: "5rem",
          fontSize: "1.1rem",
          cursor: "pointer",
          fontWeight: 600,
          color: "white",
          transition: "0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Learn More
      </Button>

    </Box>
  );
}

export default Home;
