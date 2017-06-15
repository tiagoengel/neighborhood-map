import ko from 'knockout';
import template from './template.html';
import { Map } from '../AppMap';
import { toast } from '../Toast';
import LocationProvider from '../../models/LocationProvider';

let infoWindow = null;

const Places = {
  places: ko.observableArray()
};

function createMarker(place) {
  const map = Map.mapInstance();
  const position = place.geometry.location;
  const marker = new google.maps.Marker({ map, position });

  google.maps.event.addListener(marker, 'click', function onClick() {
    this.setAnimation(google.maps.Animation.BOUNCE);
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
    setTimeout(() => this.setAnimation(null), 700);
  });
}

function onSearchResults(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.forEach(createMarker);
    Places.places(results);
  } else {
    toast(`Oh snap! We were unable to load the interesting places in your neighbourhood (${status})`, 'error');
  }
}

function loadPlaces() {
  const map = Map.mapInstance();
  infoWindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: LocationProvider.currentLocation(),
    radius: 500,
    type: ['store'] // TODO: better search
  }, onSearchResults);
}

Map.isReady.subscribe((isReady) => {
  if (isReady) {
    setTimeout(loadPlaces, 0);
  }
});

export default {
  viewModel: { instance: Places },
  template
};
