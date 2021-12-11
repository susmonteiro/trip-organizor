import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import InformationMessage from './../elements/showMessages.js';

export default function ResultsView(props) {
  return (
    <Box ml={{ lg: 12, md: 6, xs: 6 }} mr={{ lg: 12, md: 6, xs: 6 }} height="100%">
      {(props.error !== null && <h1>{props.error}</h1>) ||
        ((!props.attractions || props.attractions.length === 0) && (
          /* TODO change me */
          <InformationMessage>NO RESULTS FOUND... TRY SOMETHING ELSE!</InformationMessage>
        )) || (
          <Box>
            <List>
              {props.attractions.map((site) => (
                <ListItem key={site.properties.xid} disablePadding>
                  <IconButton
                    aria-label="Add pin"
                    sx={{ color: 'primary.main' }}
                    onClick={() => {
                      props.onAddAttraction(site.properties);
                    }}>
                    <AddLocationIcon />
                  </IconButton>
                  <ListItemButton onClick={() => props.onSetCurrentAttraction(site.properties.xid)}>
                    <ListItemText primary={site.properties.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
    </Box>
  );
}
