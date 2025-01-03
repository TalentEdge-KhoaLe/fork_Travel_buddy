import React from "react";
import { Box, CircularProgress, Typography, Card, CardContent, Button } from "@mui/material";
import FastForwardIcon from '@mui/icons-material/FastForward';
import LoadingSkeleton from "@/app/components/kits/LoadingSkeleton";
import ChallengeCarousel from "@/app/components/challenge/ChallengeCarousel";
import { useRouter } from "next/router";
import { useGetChallengeQuery, useGetUserSubmissionsQuery } from "@/libs/services/user/challenge";
import { send } from "process";

interface UserDashboardProps {
  totalChallenges: number;
  completedChallenges: number;
  activeChallenges: { id: string, name: string; status: string; link: string }[];
}


const UserDashboard: React.FC<UserDashboardProps> = ({
  totalChallenges,
  completedChallenges,
  activeChallenges,
}) => {
  const router = useRouter();

  const {
    data: challengeRef,
    error: challengeError,
    isLoading: isChallengeLoading
  } = useGetChallengeQuery({});
  const {
    data: historyRef,
    error: historyError,
    isLoading: isHistoryLoading
  } = useGetUserSubmissionsQuery();

  // If still loading, show loading state
  if (isChallengeLoading || isHistoryLoading) {
    return (
      <LoadingSkeleton isLoading={true} />
    );
  }

  let challenges;

  if (challengeRef?.data) {
    challenges = challengeRef?.data.map((item) => {
      return {
        id: item.id,
        name: item.title,
        image: item.thumbnailUrl
      };
    })
  }

  if (historyRef?.data) {
    activeChallenges = historyRef?.data.map((item) => {
      const matchedChallenge = challengeRef?.data.filter(e => e.id == item.challengeId)[0];
      return {
        id: item.challengeId,
        name: matchedChallenge?.title,
        status: !item.ended ? "In progress" : "Completed",
        link: !item?.reward ? "Your reward is being prepared" : item?.reward
      };
    })
    totalChallenges = activeChallenges.length;
    completedChallenges = activeChallenges.filter((item) => item.status == 'Completed').length;
  }


  const handleContinue = (challengeId) => {
    router.push(`/challenge/${challengeId}/locations`);
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 2,
        mb: 2,

      }}
    >
      {/* Challenge Dashboard */}
      {!challenges ?
        <Typography></Typography>:
        <ChallengeCarousel
          challenges={challenges}
          onViewAll={() => {
            router.push('/challenge')
          }}
        />}
      <Box
        sx={{
          height: "100%",
          flexDirection: "column",
          gap: 3,
          display: "flex",
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 1,
          p: 3,
        }}
      >
        {!activeChallenges ?
          <Typography></Typography>:
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "#4a90e2", fontWeight: "bold" }}
            >
              Activity
            </Typography>
            <Box>
              <Typography variant="h6" gutterBottom>
                Challenge Dashboard
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Card
                  sx={{
                    width: "50%",
                    backgroundColor: "#dff9e7",
                    color: "green",
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Participated
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {totalChallenges}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "50%",
                    backgroundColor: "#f3e7fc",
                    color: "purple",
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Completed
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {completedChallenges}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              {/* Active Challenges */}
              <Typography variant="h6" gutterBottom>
                Active Challenges
              </Typography>
              {activeChallenges.length > 0 ? (
                activeChallenges.map((challenge, index) => (
                  <Card
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor: "#fff",
                      boxShadow: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {challenge.name}
                    </Typography>
                    <Typography>Status: {challenge.status}</Typography>
                    <Typography>
                      Link to Reels:{" "}
                      {challenge.link || "Your video is being prepared!"}
                    </Typography>
                    {challenge.status !== 'Completed' ?
                      <Typography align='center'>
                        <Button
                          sx={{
                            borderRadius: 14,
                            width: "150px",
                            fontSize: { xs: "0.5rem", md: "1rem" },
                          }}
                          variant="contained"
                          startIcon={<FastForwardIcon />}
                          onClick={() => { handleContinue(challenge.id) }}>

                          Continue
                        </Button>
                      </Typography> : <Typography></Typography>
                    }

                  </Card>
                ))
              ) : (
                <Typography>No Challenges Currently Available</Typography>
              )}
            </Box>
          </Box>
        }

      </Box>
    </Box>
  );
};

export default UserDashboard;
