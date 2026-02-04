import React from 'react';
import {Container, Grid, Card, CardContent, Typography, Button, Box} from "@mui/material";
import {Link} from "react-router-dom";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

function ManageData() {
    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{ mb: 5, fontWeight: 'bold' }}
            >
                Zarządzanie Danymi
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: 'center', p: 3 }}>
                        <LocalHospitalIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Dodaj Przychodnię
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Zarejestruj nową placówkę medyczną
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            component={Link}
                            to="/newprzychodnia"
                        >
                            DODAJ
                        </Button>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: 'center', p: 3 }}>
                        <MedicalServicesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Dodaj Lekarza
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Zarejestruj nowego pracownika medycznego
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            component={Link}
                            to="/newlekarz"
                        >
                            DODAJ
                        </Button>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: 'center', p: 3 }}>
                        <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Dodaj Pacjenta
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Zarejestruj nowego pacjenta w systemie
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            component={Link}
                            to="/newpacjent"
                        >
                            DODAJ
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ManageData;