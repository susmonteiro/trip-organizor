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
  return (
    <Stack
      direction="row"
      spacing={2}
      onKeyUp={(event) => event.key === 'Enter' && props.onSearch()}>
      <TextField
        id="search-bar"
        value={props.query || ''}
        label="Search"
        variant="standard"
        error={props.query === ''}
        helperText={props.query === '' && 'Name cannot be empty'}
        onChange={(event) => props.onChangeQuery(event.target.value)}
        sx={{ minWidth: 300 }}
      />
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="select-type-input">Type</InputLabel>
        <Select
          id="select-type"
          value={props.type}
          label="Type"
          onChange={(event) => props.onChangeType(event.target.value)}>
          {props.activities.map((activity) => (
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
          value={props.date}
          onChange={(value) => props.onChangeDate(value)}
          renderInput={(params) => <TextField {...params} variant="standard" sx={{ width: 120 }} />}
        />
      </LocalizationProvider>
      <Button variant="contained" startIcon={<SearchIcon />} onClick={() => props.onSearch()}>
        Search
      </Button>
    </Stack>
  );
}
