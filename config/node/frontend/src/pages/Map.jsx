import React from 'react';
import MapComponent from "../components/MapComponent";
import {Container, Typography, Box} from '@mui/material';

function Map() {
    return (
        <Box>
            <Container maxWidth="lg" sx={{ pt: 2, pb: 1 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.5rem', md: '2.125rem' }
                    }}
                >
                    Mapa Placówek Medycznych
                </Typography>
            </Container>
            <MapComponent />
        </Box>
    );
}

export default Map;