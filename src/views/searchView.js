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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Stack from '@mui/material/Stack';

export default function SearchFormView(props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: '50%' }}
      onKeyUp={(event) => event.key === 'Enter' && props.onSearch()}>
      <Button
        // TODO buttons move when error in text field is shown
        variant="contained"
        href="/attractions"
        startIcon={<ArrowBackIosNewIcon />}>
        Back
      </Button>
      <TextField
        id="search-bar"
        value={props.query || ''}
        label="Search"
        variant="standard"
        error={props.showHelpText}
        helperText={props.showHelpText && 'Name cannot be empty'}
        onChange={(event) => props.onChangeQuery(event.target.value)}
        sx={{ minWidth: 200 }}
      />
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <InputLabel id="select-type-input">Type</InputLabel>
        <Select
          id="select-type"
          value={props.type}
          label="Type"
          onChange={(event) => props.onChangeType(event.target.value)}>
          {props.activities.map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
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
      <Button
        href="/attractions"
        disabled={!props.query || props.query.length < 3}
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() => props.onSearch()}>
        Search
      </Button>
    </Stack>
  );
}
