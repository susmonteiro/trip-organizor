import SearchFormView from '../views/searchView';

const ACTIVITY_TYPES = ['Museum', 'Restaurant', 'Sight Seen', 'Shoping'];

export default function SearchPresenter() {
  return (
    <div>
      <SearchFormView activities={ACTIVITY_TYPES} />
    </div>
  );
}
