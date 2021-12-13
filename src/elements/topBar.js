//MATERIAL IMPORTS
import Grid from '@mui/material/Grid';
//COMPONENTS
import { AccountButton, BackButton, BasicSpeedDial } from './customButtons.js';

export default function TopBar(props) {
  return (
    <Grid container spacing={0} justifyContent="space-between" alignItems="center">
      <Grid item xs={6}>
        <BackButton href={props.href} onClick={props.onClick}></BackButton>
      </Grid>
      <Grid item xs={6}>
        <BasicSpeedDial {...props}/>
      </Grid>
    </Grid>
  );
}
