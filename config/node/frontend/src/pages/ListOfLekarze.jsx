import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Chip,
    Avatar,
    Button
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import {useNavigate} from 'react-router-dom';

function ListOfLekarze() {
    const [lekarze, setLekarze] = useState([]);
    const [viewMode, setViewMode] = useState('card');
    const navigate = useNavigate();

    const avatarColors = [
        '#1976d2', '#d32f2f', '#388e3c', '#f57c00',
        '#7b1fa2', '#0097a7', '#c2185b', '#5d4037'
    ];

    useEffect(() => {
        fetch('http://localhost:10000/app/get_lekarze')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setLekarze(res.data || []);
            })
            .catch(err => console.error(err));
    }, []);

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewMode(newView);
        }
    };

    const getInitials = (imie, nazwisko) => {
        return `${imie?.charAt(0) || ''}${nazwisko?.charAt(0) || ''}`.toUpperCase();
    };

    const getAvatarColor = (index) => {
        return avatarColors[index % avatarColors.length];
    };

    const CardView = () => (
        <Grid container spacing={3}>
            {lekarze.map((lekarz, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: 6
                            }
                        }}
                    >
                        <Box sx={{
                            bgcolor: `${getAvatarColor(index)}15`,
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: getAvatarColor(index),
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    mb: 2
                                }}
                            >
                                {getInitials(lekarz.imie, lekarz.nazwisko)}
                            </Avatar>
                            <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                                {lekarz.imie} {lekarz.nazwisko}
                            </Typography>
                            <Chip
                                icon={<MedicalServicesIcon />}
                                label={lekarz.specjalizacja}
                                size="small"
                                sx={{
                                    mt: 1,
                                    bgcolor: getAvatarColor(index),
                                    color: 'white',
                                    fontWeight: 500
                                }}
                            />
                        </Box>

                        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                            {lekarz.telefon && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                                    <PhoneIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {lekarz.telefon}
                                    </Typography>
                                </Box>
                            )}

                            {lekarz.email && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                                    <EmailIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {lekarz.email}
                                    </Typography>
                                </Box>
                            )}

                            {lekarz.przychodnia_id && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocalHospitalIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        Przychodnia #{lekarz.przychodnia_id}
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    const TableView = () => (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'primary.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Lekarz</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Specjalizacja</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Telefon</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Przychodnia</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lekarze.map((lekarz, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:hover': { bgcolor: 'action.hover' },
                                '&:nth-of-type(odd)': { bgcolor: 'action.hover' }
                            }}
                        >
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            bgcolor: getAvatarColor(index),
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {getInitials(lekarz.imie, lekarz.nazwisko)}
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {lekarz.imie} {lekarz.nazwisko}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>{lekarz.specjalizacja}</TableCell>
                            <TableCell>{lekarz.telefon || '-'}</TableCell>
                            <TableCell>{lekarz.email || '-'}</TableCell>
                            <TableCell>{lekarz.przychodnia_id ? `#${lekarz.przychodnia_id}` : '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4, pt: { xs: 10, sm: 4 } }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Lista Lekarzy
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<PersonIcon />}
                        onClick={() => navigate('/newlekarz')}
                    >
                        Dodaj Lekarza
                    </Button>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="widok"
                        sx={{
                            '& .MuiToggleButton-root': {
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    }
                                }
                            }
                        }}
                    >
                        <ToggleButton value="card" aria-label="widok kart">
                            <ViewModuleIcon />
                        </ToggleButton>
                        <ToggleButton value="table" aria-label="widok tabeli">
                            <ViewListIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            {lekarze.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <MedicalServicesIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        Brak lekarzy w bazie
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<PersonIcon />}
                        onClick={() => navigate('/newlekarz')}
                    >
                        Dodaj pierwszego lekarza
                    </Button>
                </Paper>
            ) : (
                viewMode === 'card' ? <CardView /> : <TableView />
            )}
        </Container>
    );
}

export default ListOfLekarze;