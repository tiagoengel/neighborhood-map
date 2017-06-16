import template from './template.html';
import Places from '../../models/Places';
import GMap from '../../GMap';

let currMarkers = [];

const ViewModel = {
  places: Places.places
};

Places.places.subscribe((places) => {
  setTimeout(() => {
    currMarkers.forEach((marker) => {
      marker.setMap(null);
    });
    currMarkers = places.map(place => GMap.createPlaceMarker(place));
  }, 0);
});

export default {
  viewModel: { instance: ViewModel },
  template
};
