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
  const [query, setQuery] = React.useState(undefined);
  const [type, setType] = React.useState('');
  const [date, setDate] = React.useState(new Date());

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeDate = (value) => {
    setDate(value);
  };

  const handleButtonClick = (props) => {
    props.onSearch(query, type);
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        id="search-bar"
        value={query}
        label="Search"
        variant="standard"
        error={query === ''}
        helperText={query === '' ? 'Name cannot be empty' : ''}
        onBlur={handleChangeQuery}
        required
        sx={{ minWidth: 300 }}
      />
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
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() => handleButtonClick(props)}>
        Search
      </Button>
    </Stack>
  );
}
