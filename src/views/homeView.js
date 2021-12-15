import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CustomButton from '../elements/customButtons.js';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Image from './../resapp.jpg';
import { height } from '@mui/system';
import { PopupTop, PopupBottom } from '../elements/popups.js';

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

export default function HomeView(props) {
  return (
    <Paper square={true} style={styles.paperContainer}>
      <Grid container spacing={2} justifyContent="space-around" mt={{ xs: 0, md: 15 }}>
        <Grid item md={1} xs={1} />
        <Grid item md={3} xs={6}>
          <Typography
            color="primary"
            textAlign={{ xs: 'left', md: 'center' }}
            fontSize={{ xs: 30, md: 70 }}
            fontWeight={400}>
            TripOrganizor
          </Typography>
        </Grid>
        <Grid item md={4} display={{ xs: 'none', md: 'block' }}></Grid>
        <Grid item md={3} xs={4} mt={{ xs: 'none', md: 'block' }}>
          <Box>
            <PopupTop type={'error'} message={props.message} onClose={props.resetError}></PopupTop>
          </Box>
          <Box>
            <Stack sx={{ maxWidth: 300 }}>
              <TabContext value={props.authType}>
                <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
                  <p>{props.user}</p>
                  <TabList
                    onChange={(event, newValue) => {
                      props.changeAuthType(newValue);
                      props.resetError;
                    }}
                    aria-label="lab API tabs example"
                    centered>
                    <Tab label="Login" value={props.LOGIN} />
                    <Tab label="Register" value={props.REGISTER} />
                  </TabList>
                </Box>
                <TabPanel value={props.LOGIN}>
                  <Box textAlign="center">
                    <TextField
                      id="Email"
                      label="Email"
                      variant="standard"
                      fullWidth
                      onChange={(event) => props.writeEmail(event.target.value)}
                    />
                    <Box textAlign="center" mt={1}>
                      <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        fullWidth
                        type="password"
                        onChange={(event) => props.writePassword(event.target.value)}
                        onKeyUp={(event) => event.key === 'Enter' && props.clickLogin()}
                      />{' '}
                    </Box>

                    <Box textAlign="center" mt={5}>
                      <CustomButton
                        onClick={(e) => {
                          e.preventDefault(), props.clickLogin();
                        }}>
                        Login
                      </CustomButton>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={props.REGISTER}>
                  <Box textAlign="center">
                    <TextField
                      id="Email"
                      label="Email"
                      variant="standard"
                      fullWidth
                      onChange={(event) => props.writeEmail(event.target.value)}
                    />
                    <Box textAlign="center" mt={1}>
                      <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        fullWidth
                        type="password"
                        helperText={'At least 6 characters'}
                        onChange={(event) => props.writePassword(event.target.value)}
                      />
                    </Box>
                    <Box textAlign="center" mt={1}>
                      <TextField
                        id="verify_password"
                        label="Repeat Your Password"
                        variant="standard"
                        type="password"
                        fullWidth
                        onChange={(event) => props.writeVerifyPassword(event.target.value)}
                        onKeyUp={(event) => event.key === 'Enter' && props.clickRegister()}
                      />
                    </Box>
                    <Box textAlign="center" mt={5}>
                      <CustomButton
                        onClick={(e) => {
                          e.preventDefault(), props.clickRegister();
                        }}>
                        Register
                      </CustomButton>
                    </Box>
                  </Box>
                </TabPanel>
              </TabContext>
            </Stack>
          </Box>
        </Grid>
        <Grid item md={1} xs={1} />
      </Grid>
    </Paper>
  );
}
