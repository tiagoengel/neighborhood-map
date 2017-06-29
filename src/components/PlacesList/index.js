import ko from 'knockout';
import { startCase } from 'lodash';
import template from './template.html';
import Places from '../../models/Places';
import GMap from '../../GMap';
import { Sidebar } from '../Sidebar';

let markers = {};

const ViewModel = {
  places: Places.places,
  selectedPlace: ko.observable(null),

  onSelect(place) {
    if (this.selectedPlace() === place.id) {
      this.selectedPlace(null);
    } else {
      this.selectedPlace(place.id);
      this.highlight(place);
      GMap.centerOnPlace(place);
    }
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
      ? place.photos[0].getUrl({ maxWidth: 160, maxHeight: 90 })
      : place.icon;
  },

  getType(place) {
    const types = place.types;
    return types ? startCase(types[0]) : null;
  },

  showMap(place, e) {
    e.stopPropagation();
    Sidebar.close();
    this.highlight(place);
    GMap.centerOnPlace(place);
    return true;
  },
};

function forAllMarkers(cb) {
  Object.values(markers).forEach(cb);
}

function hideAllMarkers() {
  forAllMarkers(marker => GMap.hideMarker(marker));
}

function setUpMarkers() {
  const showOrCreate = (places) => {
    setTimeout(() => {
      hideAllMarkers();
      markers = Object.assign({},
        ...places.map((place) => {
          const marker = markers[place.id] || GMap.createPlaceMarker(place);
          GMap.showMarker(marker);
          return { [place.id]: marker };
        })
      );
    }, 0);
  };
  showOrCreate(ViewModel.places());
  ViewModel.places.subscribe(showOrCreate);
}

export default {
  viewModel: { instance: ViewModel, initializers: [setUpMarkers] },
  template
};
