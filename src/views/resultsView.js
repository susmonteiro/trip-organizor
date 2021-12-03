import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddLocationIcon from '@mui/icons-material/AddLocation';
export default function ResultsView(props) {
  return (
    <Box sx={{ width: '50%' }}>
      <List>
        {props.attractions.map((site) => (
          <ListItem key={site.properties.id} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'primary.main' }}>
                <AddLocationIcon />
              </ListItemIcon>
              <ListItemText primary={site.properties.name} disablePadding />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
