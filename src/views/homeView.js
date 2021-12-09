import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Image from './../resapp.jpg';

import LoginView from './loginView.js';

const styles = {
  paperContainer: {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maxHeight: '100%'
  }
};

export default function HomeView(props) {
  return (
    <Paper square="true" style={styles.paperContainer}>
      <Grid container spacing={2} justifyContent="space-around" mt={{ xs: 0, md: 15 }}>
        <Grid item md={1} xs={1} />
        <Grid item md={3} xs={6}>
          <Typography
            color="primary"
            textAlign={{ xs: 'left', md: 'center' }}
            fontSize={{ xs: 30, md: 70 }}
            fontWeight={400}>
            TripOrganizor
          </Typography>
        </Grid>
        <Grid item md={4} display={{ xs: 'none', md: 'block' }} />
        <Grid item md={3} xs={4} mt={{ xs: 0, md: 25 }}>
          <Box>
            <LoginView
              authType={props.authType}
              REGISTER={props.REGISTER}
              LOGIN={props.LOGIN}
              onChangeAuthType={(newValue) => props.onChangeAuthType(newValue)}
            />
          </Box>
        </Grid>
        <Grid item md={1} xs={1} />
      </Grid>
    </Paper>
  );
}
