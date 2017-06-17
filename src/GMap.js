import ko from 'knockout';
import LocationProvider from './models/LocationProvider';
import namedCurrying from './utils/namedCurrying';

const isReady = ko.observable(false);
let map = null;
let infoWindow = null;

const GMap = {

  instance() {
    if (!isReady()) {
      throw new Error('Map is not ready. Use GMap.onReady');
    }
    return map;
  },

  /**
   * Registers cb to be called once map isReady.
   *
   * @param {Function} cb a function called when maps is ready
   */
  onReady(cb) {
    isReady.subscribe((ready) => {
      if (ready) {
        setTimeout(cb, 0);
      }
    });
  },

  /**
   * Create a marker for a place.
   *
   * @param {object} place place object.
   */
  createPlaceMarker(place) {
    const position = place.geometry.location;
    const marker = GMap.createMarker({ position });

    google.maps.event.addListener(marker, 'click', function onClick() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
      GMap.bounceIt(this);
    });

    return marker;
  },

  /**
   * Create a marker.
   *
   * @param {object} options marker options.
   */
  createMarker(options) {
    return new google.maps.Marker(Object.assign({ map }, options));
  },

  /**
   * Bounce a marker.
   *
   * @param {object} marker the marker to be bounced.
   * @param {Number} duration the animation duration in ms. Default to 700.
   */
  bounceIt(marker, duration = 700) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => marker.setAnimation(null), duration);
  },

  /**
   * Search places near by the current location.
   * @param {object} options search options
   */
  searchNearByPlaces(options) {
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(Object.assign(
        { location: LocationProvider.currentLocation() },
        options
      ), function onSearchResults(results, status) { // eslint-disable-line
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }
};


function markMe(position) {
  const icon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#2C3E50',
    fillOpacity: 1,
    scale: 18,
    strokeColor: 'white',
    strokeWeight: 0
  };
  const label = {
    text: 'YOU',
    color: 'white'
  };
  GMap.createMarker({ icon, label, position });
}

/**
 * Function used to control map initialization, only executed when both gmap
 * suite and currentLocation are ready
 */
const maybeInitMap = namedCurrying(['currentLocation', 'mapIsReady'],
  ({ currentLocation }) => {
    map = new google.maps.Map(document.querySelector('.app__map-container'), {
      center: currentLocation,
      zoom: 17
    });
    infoWindow = new google.maps.InfoWindow();
    markMe(currentLocation);
    isReady(true);
  }
);

/**
 * Function called after gmap suite is loaded and ready
 */
window.initMap = function globalInitMap() {
  maybeInitMap({ mapIsReady: true });
};

LocationProvider.currentLocation.subscribe((currentLocation) => {
  maybeInitMap({ currentLocation });
});

export default GMap;

