import React from 'react';
import {Typography, Button} from '@mui/material'

function Home(props) {
    return (
        <div className='Home'>
        <h1 classname='home_title'>GEOPORTAL</h1>

            <Typography className='home_subtitle'>
                Geoportal tematyczny poświęcony danym przestrzennym.
            </Typography>

            <Button className='home__button' variant='contained'>START</Button>
        </div>
    );
}

export default Home;