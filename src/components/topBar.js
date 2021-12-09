//MATERIAL IMPORTS
import Grid from '@mui/material/Grid';
//COMPONENTS
import { AccountButton, BackButton } from './customButtons.js';

export default function TopBar(props) {
  return (
    <Grid container spacing={0} justifyContent="space-between" alignItems="center">
      <Grid item xs="6">
        <BackButton {...props}></BackButton>
      </Grid>
      <Grid item xs="6">
        <AccountButton />
      </Grid>
    </Grid>
  );
}
