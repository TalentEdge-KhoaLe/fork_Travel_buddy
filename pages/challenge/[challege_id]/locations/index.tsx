import React, { useState } from "react";
import { Box, Button, IconButton, Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

import defaultBackground from "@/assets/background.jpg"; // Replace with the actual background image path
import LocationCard from "@/app/components/challenge/LocationCard";
import ReviewNotesComponent from "@/app/components/challenge/ReviewModal";
import { ChangeCircle } from "@mui/icons-material";
import LocationStageModal from "@/app/components/challenge/LocationStageModal";

function JoinChallenge() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const locations = [
    {
      id: 1,
      name: "Train Street Hanoi",

      sections: 3,
    },
    { id: 2, name: "Hoan Kiem Lake", sections: 3 },
    {
      id: 3,
      name: "St. Joseph's Cathedral",

      sections: 3,
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [locationStage, setLocationStage] = useState(false);

  return (
    <Box
      sx={{
        backgroundImage: `url("${defaultBackground.src}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        color: "white",
        textAlign: "center",
        padding: "20px",
        gap: 4,
        position: "relative",
      }}
    >
      {/* Go Back Button */}
      <IconButton
        onClick={handleGoBack}
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Main Content */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        {locations.map((location,index) => (
          <LocationCard key={index} location={location} />
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Submit
      </Button>
      <ReviewNotesComponent
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <LocationStageModal
        open={locationStage}
        onClose={() => setLocationStage(false)}
        locations={locations}
      />
      <Fab
        onClick={() => setLocationStage(true)}
        variant="extended"
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          borderRadius: 2, // Adjust the border radius to make the corners more or less rounded
          padding: "8px 16px", // Adjust padding for desired button size
          boxShadow: 3, // Optional, to give it a shadow for a raised effect
        }}
      >
        <ChangeCircle />
      </Fab>
    </Box>
  );
}

export default JoinChallenge;
