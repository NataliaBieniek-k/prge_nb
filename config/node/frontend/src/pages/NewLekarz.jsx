import React, {useState} from 'react';
import {Container, Box, TextField, Button, Paper, Typography, Grid} from "@mui/material";
import {useNavigate} from 'react-router-dom';

function NewLekarz() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imie: "",
        nazwisko: "",
        specjalizacja: "",
        telefon: "",
        email: "",
        przychodnia_id: ""
    });

    const handleChange = (field) => (e) => {
        setFormData({...formData, [field]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:10000/app/insert_lekarz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Lekarz został dodany!');
                navigate('/lekarze');
            }
        } catch (e) {
            console.error(e);
            alert('Wystąpił błąd podczas dodawania lekarza');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                    Dodaj Nowego Lekarza
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label="Imię"
                                value={formData.imie}
                                onChange={handleChange('imie')}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label="Nazwisko"
                                value={formData.nazwisko}
                                onChange={handleChange('nazwisko')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Specjalizacja"
                                value={formData.specjalizacja}
                                onChange={handleChange('specjalizacja')}
                                helperText="np. Kardiolog, Pediatra"
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

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ID Przychodni"
                                type="number"
                                value={formData.przychodnia_id}
                                onChange={handleChange('przychodnia_id')}
                                helperText="Opcjonalne - ID przychodni, w której pracuje lekarz"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant='contained'
                                fullWidth
                                size="large"
                            >
                                Dodaj Lekarza
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default NewLekarz;