import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ResultsView(props) {
  return (
    <Box sx={{ width: '50%' }}>
      {(props.error !== null && <h1>{props.error}</h1>) ||
        ((!props.attractions || props.attractions.length === 0) && (
          /* TODO change me */
          <Typography variant="h6" align="center" m={5}>
            No results found :(
          </Typography>
        )) || (
          <List>
            {props.attractions.map((site) => (
              <ListItem key={site.properties.xid} disablePadding>
                <ListItemButton
                  onClick={() => {
                    console.log(site.properties);
                    props.onAddAttraction(site.properties);
                  }}
                  component={Link}
                  to="/attractions">
                  {/* TODO change me */}
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    <AddLocationIcon />
                  </ListItemIcon>
                  <ListItemText primary={site.properties.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
    </Box>
  );
}
