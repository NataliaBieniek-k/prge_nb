import React from 'react';
import {Button, Box, Container, Grid, Card, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Services() {
    const services = [
        {
            title: 'MAPA PRZYCHODNI',
            description: 'Przeglądaj lokalizacje placówek medycznych na interaktywnej mapie',
            icon: <MapIcon sx={{ fontSize: { xs: 50, md: 60 } }} />,
            link: '/map',
            color: '#1976d2'
        },
        {
            title: 'LISTA PLACÓWEK',
            description: 'Przegląd dostępnych placówek medycznych z pełnymi informacjami',
            icon: <ListAltIcon sx={{ fontSize: { xs: 50, md: 60 } }} />,
            link: '/przychodnie',
            color: '#2e7d32'
        },
        {
            title: 'DODAJ DANE',
            description: 'Dodaj nową przychodnię, lekarza lub pacjenta do bazy',
            icon: <PersonAddIcon sx={{ fontSize: { xs: 50, md: 60 } }} />,
            link: '/manage',
            color: '#ed6c02'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
            <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{
                    mb: { xs: 3, md: 5 },
                    fontWeight: 'bold',
                    fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                }}
            >
                Dostępne Usługi
            </Typography>

            <Grid container spacing={{ xs: 2, md: 4 }}>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: { xs: 150, md: 200 },
                                    bgcolor: service.color,
                                    color: 'white'
                                }}
                            >
                                {service.icon}
                            </Box>
                            <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                                <Typography variant="h5" gutterBottom align="center" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                                    {service.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" align="center" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                    {service.description}
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2 }}>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    size='large'
                                    component={Link}
                                    to={service.link}
                                    sx={{
                                        py: { xs: 1, md: 1.5 }
                                    }}
                                >
                                    PRZEJDŹ
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Services;