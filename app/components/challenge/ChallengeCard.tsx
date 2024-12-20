import { useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const ChallengeCard = ({ challenge }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback image URL
  const placeholderImage =
    "https://via.placeholder.com/150?text=Image+Unavailable";

  return (
    <Box
      key={challenge.id}
      sx={{
        flex: 1, 
      }}
    >
      <Card
        sx={{
          borderRadius: "8px",
          boxShadow: 3,

        }}
      >
        <CardMedia
          component="img"
          height="250px"
          image={
            imageError || !challenge.image ? placeholderImage : challenge.image
          }
          alt={challenge.name || "Location Image"}
          onError={() => setImageError(true)} // Handle image load error
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {challenge.name || "Unknown Challenge"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChallengeCard;
