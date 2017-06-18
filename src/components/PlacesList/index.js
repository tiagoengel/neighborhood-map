import ko from 'knockout';
import template from './template.html';
import Places from '../../models/Places';
import GMap from '../../GMap';

let markers = {};

const ViewModel = {
  places: Places.places,
  selectedPlace: ko.observable(null),

  onSelect(place) {
    this.selectedPlace(place.id);
    this.highlight(place);
  },

  isSelected(place) {
    return place.id === this.selectedPlace();
  },

  highlight(place) {
    const marker = markers[place.id];
    if (marker) {
      GMap.bounceIt(marker, 1400);
      GMap.showInfo(marker, place.name);
    }
  },

  getPhoto(place) {
    return place.photos
      ? place.photos[0].getUrl({ maxWidth: 160, maxHeight: 160 })
      : place.icon;
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
      ...places.map(place => ({ [place.id]: GMap.createPlaceMarker(place) }))
    );
  }, 0);
});

export default {
  viewModel: { instance: ViewModel },
  template
};
