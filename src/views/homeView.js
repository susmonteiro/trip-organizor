import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import Image from './../resapp.jpg';

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

export default function HomeView() {
  return (
    <Paper square="true" style={styles.paperContainer}>
      <Grid container spacing={2} justifyContent="space-between" mt={15}>
        <Grid item xs="1" />
        <Grid item xs="8">
          <Typography color="primary" variant="h1">
            RESAPP
          </Typography>
        </Grid>
        <Grid
          item
          xs="3"
          container
          rowSpacing={1}
          mt={25}
          justifyContent="space-between"
          spacing={0}>
          <Grid item xs="7">
            <TextField
              id="username"
              label="Username"
              borderColor="primary"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs="7">
            <TextField id="password" label="Password" variant="standard" fullWidth />
          </Grid>
          <Grid item xs="4" />

          <Grid item xs="3" mt={2}>
            <Button
              size="large"
              // TODO buttons move when error in text field is shown
              variant="outlined"
              sx={{ borderRadius: 28, width: 100 }}
              href="/trips">
              Register
            </Button>
          </Grid>
          <Grid item xs="3" mt={2}>
            <Button
              size="large"
              // TODO buttons move when error in text field is shown
              variant="contained"
              sx={{ borderRadius: 28, width: 100 }}
              href="/trips">
              Login
            </Button>
          </Grid>

          <Grid item xs="4" />
        </Grid>
      </Grid>

      {/* <Stack spacing={2} mr={110} textAlign="center">
        <Typography color="primary" variant="h1" mt={45}>
          RESAPP
        </Typography>
        <TextField id="username" label="Username" variant="standard" sx={{ maxWidth: 200 }} />
        <TextField id="password" label="Password" variant="standard" sx={{ maxWidth: 200 }} />
        <Box>
          <Button
            size="large"
            // TODO buttons move when error in text field is shown
            variant="contained"
            href="/trips">
            Start
          </Button>
        </Box>
      </Stack> */}
    </Paper>
  );
}
