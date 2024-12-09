import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ChallengeLocations = () => {
    const locations = [
        { id: 1, name: 'Train Street Hanoi', image: '/train-street.jpg', sections: 3 },
        { id: 2, name: 'Hoan Kiem Lake', image: '/hoan-kiem.jpg', sections: 3 },
        { id: 3, name: "St. Joseph's Cathedral", image: '/cathedral.jpg', sections: 3 },
    ];

    return (
        <Box sx={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '1.5rem',
                }}
            >
                <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    Challenge Locations
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginRight: '1rem', marginBottom: { xs: '0.5rem', sm: 0 } }}
                    >
                        Submit Challenge
                    </Button>
                    <Button variant="outlined" color="primary">
                        Back to Portal
                    </Button>
                </Box>
            </Box>

            {/* Locations */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    justifyContent: { xs: 'center', sm: 'space-between' },
                }}
            >
                {/* Add New Location Card */}
                <Box
                    sx={{
                        flex: '1 1 calc(100% - 1.5rem)', // Full width on small screens
                        maxWidth: { sm: 'calc(50% - 1.5rem)', md: 'calc(33.33% - 1.5rem)' },
                        border: '2px dashed #ddd',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '1rem',
                    }}
                >
                    <Box>
                        <AddIcon sx={{ fontSize: 40, color: '#666' }} />
                        <Typography variant="subtitle1" color="textSecondary">
                            Add New Location
                        </Typography>
                    </Box>
                </Box>

                {/* Location Cards */}
                {locations.map((location) => (
                    <Box
                        key={location.id}
                        sx={{
                            flex: '1 1 calc(100% - 1.5rem)', // Full width on small screens
                            maxWidth: { sm: 'calc(50% - 1.5rem)', md: 'calc(33.33% - 1.5rem)' },
                        }}
                    >
                        <Card
                            sx={{
                                borderRadius: '8px',
                                boxShadow: 3,
                                height: '100%',
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={location.image}
                                alt={location.name}
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    {location.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {location.sections} sections
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ChallengeLocations;
