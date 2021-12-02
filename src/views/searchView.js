import * as React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

export default function SearchFormView(props) {
  const activities = props.activities;
  const [type, setType] = React.useState('');
  const [date, setDate] = React.useState(new Date());

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeDate = (value) => {
    setDate(value);
  };

  const handleButtonClick = () => {
    console.log(type, date);
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField id="search-bar" label="Search" variant="standard" sx={{ minWidth: 300 }} />
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="select-type-input">Type</InputLabel>
        <Select
          id="select-type"
          value={type}
          label="Type"
          onChange={handleChangeType} // TODO in model
        >
          {activities.map((activity) => (
            <MenuItem key={activity} value={activity}>
              {activity}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date"
          inputFormat="dd/MM/yyyy"
          value={date}
          onChange={handleChangeDate} // TODO in model
          renderInput={(params) => <TextField {...params} variant="standard" sx={{ width: 120 }} />}
        />
      </LocalizationProvider>
      <Button variant="contained" startIcon={<SearchIcon />} onClick={handleButtonClick}>
        Search
      </Button>
    </Stack>
  );
}
