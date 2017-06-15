import ko from 'knockout';
import template from './template.html';
import LocationProvider from '../../models/LocationProvider';
import namedCurrying from '../../utils/namedCurrying';

export const Map = {
  isReady: ko.observable(false),
  mapInstance: ko.observable(null)
};

function markMe(position) {
  const map = Map.mapInstance();
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
  new google.maps.Marker({ map, position, icon, label }); // eslint-disable-line
}

const maybeInitMap = namedCurrying(['currentLocation', 'mapIsReady'],
  ({ currentLocation }) => {
    Map.mapInstance(new google.maps.Map(document.querySelector('.map'), { //eslint-disable-line
      center: currentLocation,
      zoom: 17
    }));
    markMe(currentLocation);
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
