import React, {useState} from 'react';
import {Container, Box, TextField, Button, Paper, Typography, Grid} from "@mui/material";
import {useNavigate} from 'react-router-dom';

function NewPacjent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imie: "",
        nazwisko: "",
        pesel: "",
        data_urodzenia: "",
        telefon: "",
        email: "",
        adres: ""
    });

    const handleChange = (field) => (e) => {
        setFormData({...formData, [field]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:10000/app/insert_pacjent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Pacjent został dodany!');
                navigate('/pacjenci');
            }
        } catch (e) {
            console.error(e);
            alert('Wystąpił błąd podczas dodawania pacjenta');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                    Dodaj Nowego Pacjenta
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

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label="PESEL"
                                value={formData.pesel}
                                onChange={handleChange('pesel')}
                                inputProps={{ maxLength: 11 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label="Data urodzenia"
                                type="date"
                                value={formData.data_urodzenia}
                                onChange={handleChange('data_urodzenia')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                label="Adres"
                                value={formData.adres}
                                onChange={handleChange('adres')}
                                multiline
                                rows={2}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant='contained'
                                fullWidth
                                size="large"
                            >
                                Dodaj Pacjenta
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default NewPacjent;