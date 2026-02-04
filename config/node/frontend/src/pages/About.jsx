import React from 'react';
import {Container, Typography, Paper, Box} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function About() {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
            <Paper elevation={3} sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <InfoIcon sx={{ fontSize: { xs: 50, md: 60 }, color: 'primary.main' }} />
                </Box>

                <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '3rem' } }}>
                    O Projekcie
                </Typography>

                <Typography variant="body1" paragraph sx={{ mt: 3, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                    Geoportal Medyczny to aplikacja tematyczna poświęcona placówkom medycznym
                    i opiece zdrowotnej. System umożliwia przeglądanie, wyszukiwanie i zarządzanie
                    informacjami o przychodniach, lekarzach i pacjentach.
                </Typography>

                <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                    Główne funkcjonalności:
                </Typography>

                <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                        Interaktywna mapa z lokalizacjami przychodni
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                        Przeglądanie listy placówek w różnych widokach
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                        Dodawanie nowych przychodni, lekarzy i pacjentów
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                        Responsywny interfejs dostosowany do urządzeń mobilnych
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default About;