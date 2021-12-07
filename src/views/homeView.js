import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

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
      <Stack spacing={2} mr={110} textAlign="center">
        <Typography color="primary" variant="h1" mt={45}>
          RESAPP
        </Typography>
        <Box>
          <Button
            size="large"
            // TODO buttons move when error in text field is shown
            variant="contained"
            href="/trips">
            Start
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
