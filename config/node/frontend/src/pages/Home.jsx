import React from 'react';
import {Typography, Button, Box} from '@mui/material';
import {Link} from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

function Home(props) {
    return (
        <div className='Home'>
            <h1 className='home_title'>GEOPORTAL</h1>

            <Typography className='home_subtitle'>
                Geoportal tematyczny poświęcony danym przestrzennym.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button
                    className='home__button'
                    variant='contained'
                    size='large'
                    component={Link}
                    to='services'
                >
                    START
                </Button>

                <Button
                    variant='outlined'
                    size='large'
                    component={Link}
                    to='about'
                    startIcon={<InfoIcon />}
                    sx={{ color: '#e1e1e1', borderColor: '#e1e1e1' }}
                >
                    O GEOPORTALU
                </Button>
            </Box>
        </div>
    );
}

export default Home;