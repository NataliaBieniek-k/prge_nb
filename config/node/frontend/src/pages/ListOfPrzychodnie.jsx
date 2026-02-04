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
    IconButton
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MapIcon from '@mui/icons-material/Map';
import {useNavigate} from 'react-router-dom';

function ListOfPrzychodnie() {
    const [przychodnie, setPrzychodnie] = useState([]);
    const [viewMode, setViewMode] = useState('card');
    const navigate = useNavigate();

    const iconColors = [
        { color: '#1976d2', icon: LocalHospitalIcon },
        { color: '#d32f2f', icon: MedicalServicesIcon },
        { color: '#388e3c', icon: HealthAndSafetyIcon },
        { color: '#f57c00', icon: VaccinesIcon },
        { color: '#7b1fa2', icon: LocalHospitalIcon },
        { color: '#0097a7', icon: MedicalServicesIcon },
    ];

    useEffect(() => {
        fetch('http://localhost:10000/app/get_przychodnie')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setPrzychodnie(res.data || []);
            })
            .catch(err => console.error(err));
    }, []);

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewMode(newView);
        }
    };

    const getIconConfig = (index) => {
        return iconColors[index % iconColors.length];
    };

    const handleShowOnMap = (przychodnia) => {
        navigate(`/map?lat=${przychodnia.lat}&lon=${przychodnia.lon}&id=${przychodnia.id}`);
    };

    const CardView = () => (
        <Grid container spacing={3}>
            {przychodnie.map((przychodnia, index) => {
                const IconComponent = getIconConfig(index).icon;
                const iconColor = getIconConfig(index).color;

                return (
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
                            <Box
                                sx={{
                                    height: 140,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: `linear-gradient(135deg, ${iconColor}ee 0%, ${iconColor}aa 100%)`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        top: '-50px',
                                        right: '-50px'
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        bottom: '-40px',
                                        left: '-40px'
                                    }}
                                />
                                <IconComponent
                                    sx={{
                                        fontSize: 80,
                                        color: 'white',
                                        zIndex: 1,
                                        filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.2))'
                                    }}
                                />
                            </Box>

                            <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                    {przychodnia.nazwa}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5, gap: 1 }}>
                                    <LocationOnIcon sx={{ fontSize: 20, color: iconColor, mt: 0.3 }} />
                                    <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                        {przychodnia.adres}
                                    </Typography>
                                </Box>

                                {przychodnia.telefon && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                                        <PhoneIcon sx={{ fontSize: 20, color: iconColor }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {przychodnia.telefon}
                                        </Typography>
                                    </Box>
                                )}

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {przychodnia.opis || 'Brak opisu'}
                                </Typography>

                                <Chip
                                    icon={<MapIcon />}
                                    label="Zobacz na mapie"
                                    size="small"
                                    onClick={() => handleShowOnMap(przychodnia)}
                                    sx={{
                                        bgcolor: `${iconColor}15`,
                                        color: iconColor,
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: `${iconColor}25`,
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );

    const TableView = () => (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'primary.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Nazwa</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Adres</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Telefon</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Opis</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }} align="center">Mapa</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {przychodnie.map((przychodnia, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:hover': { bgcolor: 'action.hover' },
                                '&:nth-of-type(odd)': { bgcolor: 'action.hover' }
                            }}
                        >
                            <TableCell sx={{ fontWeight: 500 }}>{przychodnia.nazwa}</TableCell>
                            <TableCell>{przychodnia.adres}</TableCell>
                            <TableCell>{przychodnia.telefon || '-'}</TableCell>
                            <TableCell>{przychodnia.opis || '-'}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={() => handleShowOnMap(przychodnia)}
                                >
                                    <MapIcon />
                                </IconButton>
                            </TableCell>
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
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    Lista Placówek Medycznych
                </Typography>

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

            {przychodnie.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <LocalHospitalIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Brak placówek do wyświetlenia
                    </Typography>
                </Paper>
            ) : (
                viewMode === 'card' ? <CardView /> : <TableView />
            )}
        </Container>
    );
}

export default ListOfPrzychodnie;