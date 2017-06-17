import template from './template.html';
import Places from '../../models/Places';
import GMap from '../../GMap';

let markers = {};

const ViewModel = {
  places: Places.places,

  bounceIt(place) {
    const marker = markers[place.name];
    if (marker) {
      GMap.bounceIt(marker, 1400);
    }
  }
};

function cleanMarkers() {
  Object.values(markers).forEach((marker) => {
    marker.setMap(null);
  });
}

Places.places.subscribe((places) => {
  setTimeout(() => {
    cleanMarkers();
    markers = Object.assign(
      ...places.map(place => ({ [place.name]: GMap.createPlaceMarker(place) }))
    );
  }, 0);
});

export default {
  viewModel: { instance: ViewModel },
  template
};
