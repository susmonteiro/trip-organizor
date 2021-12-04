import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function HomeView() {
  return (
    <Stack textAlign="center" spacing={2}>
      <Typography variant="h3" mt={40}>
        Welcome to our App
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
  );
}
