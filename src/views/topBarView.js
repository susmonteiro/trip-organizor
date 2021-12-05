import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';

export default function TopBarView(props) {
  return (
    // TODO check scroll bar position
    <AppBar position="relative">
      <Toolbar spacing={2}>
        <IconButton size="large" color="inherit" aria-label="home" href="/" sx={{ mr: 2 }}>
          <HomeIcon />
        </IconButton>
        <Button color="inherit" href="/trips" sx={{ mr: 2 }}>
          My Trips
        </Button>
        <Button color="inherit" href="/attractions" sx={{ mr: 2 }}>
          See Attractions
        </Button>
        <Button color="inherit" href="/search">
          Add Attraction
        </Button>
      </Toolbar>
    </AppBar>
  );
}
