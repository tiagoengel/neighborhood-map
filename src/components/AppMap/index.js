import ko from 'knockout';
import template from './template.html';
import LocationProvider from '../../models/LocationProvider';
import namedCurrying from '../../utils/namedCurrying';

export const Map = {
  isReady: ko.observable(false)
};

const maybeInitMap = namedCurrying(['currentLocation', 'mapIsReady'],
  ({ currentLocation }) => {
    Map.isReady(true);
    const [lat, lng] = currentLocation.split(',');
    new google.maps.Map(document.querySelector('.map'), { //eslint-disable-line
      center: { lat: parseFloat(lat, 10), lng: parseFloat(lng, 10) },
      zoom: 15
    });
  }
);

window.initMap = function initMap() {
  maybeInitMap({ mapIsReady: true });
};

LocationProvider.currentLocation.subscribe((currentLocation) => {
  maybeInitMap({ currentLocation });
});

export default {
  viewModel: { instance: Map },
  template
};
