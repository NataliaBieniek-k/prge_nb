import React, {useState} from 'react';
import {Container, Box, TextField, Button, Paper, Typography, Grid} from "@mui/material";
import {useNavigate} from 'react-router-dom';

function NewPrzychodnia() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nazwa: "",
        adres: "",
        telefon: "",
        email: "",
        opis: "",
        lat: "",
        lon: ""
    });

    const handleChange = (field) => (e) => {
        setFormData({...formData, [field]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:10000/app/insert_przychodnia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Przychodnia została dodana!');
                navigate('/przychodnie');
            }
        } catch (e) {
            console.error(e);
            alert('Wystąpił błąd podczas dodawania przychodni');
        }
    };

    return (
        <Container maxWidth="md" sx={{ pt: { xs: 10, sm: 4 } }}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                    Dodaj Nową Przychodnię
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Nazwa przychodni"
                                value={formData.nazwa}
                                onChange={handleChange('nazwa')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Adres"
                                value={formData.adres}
                                onChange={handleChange('adres')}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Telefon"
                                value={formData.telefon}
                                onChange={handleChange('telefon')}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange('email')}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Szerokość geograficzna (lat)"
                                type="number"
                                inputProps={{ step: "any" }}
                                value={formData.lat}
                                onChange={handleChange('lat')}
                                helperText="np. 52.2297"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Długość geograficzna (lon)"
                                type="number"
                                inputProps={{ step: "any" }}
                                value={formData.lon}
                                onChange={handleChange('lon')}
                                helperText="np. 21.0122"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Opis"
                                value={formData.opis}
                                onChange={handleChange('opis')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant='contained'
                                fullWidth
                                size="large"
                            >
                                Dodaj Przychodnię
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default NewPrzychodnia;