import React from 'react'
import Header from './Header';
import {Container, Grid, Box, Typography} from '@mui/material';
import iitLogo from '../assets/IITPatnaL.jpg';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Box>
      <Container sx={{ paddingTop: '50px' }}>
   
        <Grid xs={12} justifyContent="center" spacing={3}>
          <Grid item>
            <img src={iitLogo} width="300px" height="300px" />
          </Grid>
          <Grid item>
            <Typography variant="h3">COVID Tracker</Typography>
          </Grid>
        </Grid>
      </Container>
      </Box>
    </div>
  )
}

export default HomePage