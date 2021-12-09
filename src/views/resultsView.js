import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Typography from '@mui/material/Typography';

export default function ResultsView(props) {
  return (
    <Box ml={{ lg: 12, md: 6, xs: 6 }} mr={{ lg: 12, md: 6, xs: 6 }}>
      {(props.error !== null && <h1>{props.error}</h1>) ||
        ((!props.attractions || props.attractions.length === 0) && (
          /* TODO change me */
          <Box mt={10}>
            <Typography color="primary.faded" align="center">
              NO RESULTS FOUND... TRY SOMETHING ELSE!
            </Typography>
          </Box>
        )) || (
          <List>
            {props.attractions.map((site) => (
              <ListItem key={site.properties.xid} disablePadding>
                <ListItemButton
                  onClick={() => {
                    props.onAddAttraction(site.properties);
                  }}>
                  {/* TODO change me */}
                  <ListItemIcon sx={{ color: 'secondary.dark' }}>
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
