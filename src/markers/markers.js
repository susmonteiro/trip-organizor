import amusement from '../markers/amusement.svg';
import amusementFav from '../markers/amusement-fav.svg';
import architecture from '../markers/architecture.svg';
import architectureFav from '../markers/architecture-fav.svg';
import entertainment from '../markers/entertainment.svg';
import entertainmentFav from '../markers/entertainment-fav.svg';
import food_drinks from '../markers/food_drinks.svg';
import food_drinksFav from '../markers/food_drinks-fav.svg';
import historic from '../markers/historic.svg';
import historicFav from '../markers/historic-fav.svg';
import museums from '../markers/museums.svg';
import museumsFav from '../markers/museums-fav.svg';
import natural from '../markers/natural.svg';
import naturalFav from '../markers/natural-fav.svg';
import religion from '../markers/religion.svg';
import religionFav from '../markers/religion-fav.svg';
import shops from '../markers/shops.svg';
import shopsFav from '../markers/shops-fav.svg';
import sport from '../markers/sport.svg';
import sportFav from '../markers/sport-fav.svg';

import marker from '../markers/marker.svg';
import favMarker from '../markers/favMarker.svg';

export default function markers(name, fav) {
  switch (name) {
    case 'amusements':
      return fav ? amusementFav : amusement;
    case 'architecture':
      return fav ? architectureFav : architecture;
    case 'theatres_and_entertainments':
      return fav ? entertainmentFav : entertainment;
    case 'foods':
      return fav ? food_drinksFav : food_drinks;
    case 'historic':
      return fav ? historicFav : historic;
    case 'museums':
      return fav ? museumsFav : museums;
    case 'natural,urban_environment':
      return fav ? naturalFav : natural;
    case 'religion':
      return fav ? religionFav : religion;
    case 'shops':
      return fav ? shopsFav : shops;
    case 'sport':
      return fav ? sportFav : sport;
    default:
      return fav ? favMarker : marker;
  }
}
