import template from './template.html';
import Places from '../../models/Places';
import GMap from '../../GMap';

let markers = [];

const ViewModel = {
  places: Places.places
};

function cleanMarkers() {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
}

Places.places.subscribe((places) => {
  setTimeout(() => {
    cleanMarkers();
    markers = places.map(place => GMap.createPlaceMarker(place));
  }, 0);
});

export default {
  viewModel: { instance: ViewModel },
  template
};
