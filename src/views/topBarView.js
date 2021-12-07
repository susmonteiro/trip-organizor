import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';

export default function TopBarView(props) {
  return (
    // TODO check scroll bar position
    <AppBar position="absolute" color="secondary">
      <Toolbar spacing={2}>
        <Button color="inherit" href="/" sx={{ mr: 2 }}>
          Home
        </Button>
        <Button color="inherit" href="/trips" sx={{ mr: 2 }}>
          My Trips
        </Button>
      </Toolbar>
    </AppBar>
  );
}
