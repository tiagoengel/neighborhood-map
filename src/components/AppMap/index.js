import ko from 'knockout';
import template from './template.html';
import LocationProvider from '../../models/LocationProvider';
import namedCurrying from '../../utils/namedCurrying';

export const Map = {
  isReady: ko.observable(false),
  mapInstance: ko.observable(null)
};

const maybeInitMap = namedCurrying(['currentLocation', 'mapIsReady'],
  ({ currentLocation }) => {
    Map.mapInstance(new google.maps.Map(document.querySelector('.map'), { //eslint-disable-line
      center: currentLocation,
      zoom: 17
    }));
    Map.isReady(true);
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
