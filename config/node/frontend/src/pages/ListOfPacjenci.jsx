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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleIcon from '@mui/icons-material/People';
import {useNavigate} from 'react-router-dom';

function ListOfPacjenci() {
    const [pacjenci, setPacjenci] = useState([]);
    const [viewMode, setViewMode] = useState('card');
    const navigate = useNavigate();

    const avatarColors = [
        '#4caf50', '#2196f3', '#ff9800', '#e91e63',
        '#9c27b0', '#00bcd4', '#ff5722', '#607d8b'
    ];

    useEffect(() => {
        fetch('http://localhost:10000/app/get_pacjenci')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setPacjenci(res.data || []);
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

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL');
    };

    const CardView = () => (
        <Grid container spacing={3}>
            {pacjenci.map((pacjent, index) => (
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
                                {getInitials(pacjent.imie, pacjent.nazwisko)}
                            </Avatar>
                            <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                                {pacjent.imie} {pacjent.nazwisko}
                            </Typography>
                            {pacjent.pesel && (
                                <Chip
                                    icon={<BadgeIcon />}
                                    label={`PESEL: ${pacjent.pesel}`}
                                    size="small"
                                    sx={{
                                        mt: 1,
                                        bgcolor: getAvatarColor(index),
                                        color: 'white',
                                        fontWeight: 500
                                    }}
                                />
                            )}
                        </Box>

                        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                            {pacjent.data_urodzenia && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                                    <CakeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {formatDate(pacjent.data_urodzenia)}
                                    </Typography>
                                </Box>
                            )}

                            {pacjent.telefon && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                                    <PhoneIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {pacjent.telefon}
                                    </Typography>
                                </Box>
                            )}

                            {pacjent.email && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                                    <EmailIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {pacjent.email}
                                    </Typography>
                                </Box>
                            )}

                            {pacjent.adres && (
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                    <HomeIcon sx={{ fontSize: 20, color: 'text.secondary', mt: 0.3 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {pacjent.adres}
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
                    <TableRow sx={{ bgcolor: 'success.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Pacjent</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>PESEL</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Data urodzenia</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Telefon</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Adres</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pacjenci.map((pacjent, index) => (
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
                                        {getInitials(pacjent.imie, pacjent.nazwisko)}
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {pacjent.imie} {pacjent.nazwisko}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>{pacjent.pesel || '-'}</TableCell>
                            <TableCell>{formatDate(pacjent.data_urodzenia) || '-'}</TableCell>
                            <TableCell>{pacjent.telefon || '-'}</TableCell>
                            <TableCell>{pacjent.email || '-'}</TableCell>
                            <TableCell>{pacjent.adres || '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                    Lista Pacjentów
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<PersonAddIcon />}
                        onClick={() => navigate('/newpacjent')}
                    >
                        Dodaj Pacjenta
                    </Button>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="widok"
                        sx={{
                            '& .MuiToggleButton-root': {
                                '&.Mui-selected': {
                                    bgcolor: 'success.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'success.dark',
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

            {pacjenci.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <PeopleIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        Brak pacjentów w bazie
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<PersonAddIcon />}
                        onClick={() => navigate('/newpacjent')}
                    >
                        Dodaj pierwszego pacjenta
                    </Button>
                </Paper>
            ) : (
                viewMode === 'card' ? <CardView /> : <TableView />
            )}
        </Container>
    );
}

export default ListOfPacjenci;