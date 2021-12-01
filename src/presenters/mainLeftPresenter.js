import SearchFormView from '../views/searchView';
import Box from '@mui/material/Box';

const ACTIVITY_TYPES = ['Museum', 'Restaurant', 'Sight Seen', 'Shoping'];

export default function SearchPresenter() {
  return (
    <Box>
      <SearchFormView activities={ACTIVITY_TYPES} />
    </Box>
  );
}
