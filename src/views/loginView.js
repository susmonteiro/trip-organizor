import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Stack from '@mui/material/Stack';

import CustomButton from '../components/customButtons.js';

export default function LoginView(props) {
  return (
    <Stack sx={{ maxWidth: 300 }}>
      <TabContext value={props.authType}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList
            onChange={(event, newValue) => props.onChangeAuthType(newValue)}
            aria-label="lab API tabs example"
            centered>
            <Tab label="Login" value={props.LOGIN} />
            <Tab label="Register" value={props.REGISTER} />
          </TabList>
        </Box>
        <TabPanel value={props.LOGIN}>
          <Box textAlign="center">
            <TextField id="username" label="Username" variant="standard" fullWidth />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              fullWidth
              type="password"
            />
            <Box textAlign="center" mt={5}>
              <CustomButton href="/trips">Login</CustomButton>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={props.REGISTER}>
          <Box textAlign="center">
            <TextField id="name" label="Your name" variant="standard" fullWidth />
            <TextField id="username" label="Username" variant="standard" fullWidth />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              fullWidth
              type="password"
            />
            <Box textAlign="center" mt={5}>
              <CustomButton href="/trips">Register</CustomButton>
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </Stack>
  );
}
