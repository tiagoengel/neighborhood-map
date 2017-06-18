import ko from 'knockout';
import { memoize } from 'lodash';
import template from './template.html';
import Places from '../../models/Places';
import GMap from '../../GMap';
import FourSquare from '../../FourSquare';

let markers = {};

const ViewModel = {
  places: Places.places,
  selectedPlace: ko.observable(null),
  activeFetching: ko.observableArray(),
  tips: ko.observable({}),

  onSelect(place) {
    this.selectedPlace(place.id);
    this.bounceIt(place);
    this.fetchTips(place);
  },

  isSelected(place) {
    return place.id === this.selectedPlace();
  },

  bounceIt(place) {
    const marker = markers[place.id];
    if (marker) {
      GMap.bounceIt(marker, 1400);
    }
  },

  getPhoto(place) {
    return place.photos
      ? place.photos[0].getUrl({ maxWidth: 160, maxHeight: 160 })
      : place.icon;
  },

  getTips(place) {
    return this.tips()[place.id];
  },

  isFetching(place) {
    return place.__isLoading;
  },

  fetchTips: memoize((place) => {
    //TODO: not working
    place.__isLoading = ko.observable(true);
    return FourSquare
      .searchVenue(place)
      .then((venue) => {
        if (venue) {
          return FourSquare.getTips(venue);
        }
        return [];
      })
      .then((tips) => {
        const newTips = ViewModel.tips();
        newTips[place.id] = tips;
        ViewModel.tips(newTips);
      })
      .finally(() => {
        place.__isLoading(false);
      });
  })
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
