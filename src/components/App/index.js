import ko from 'knockout';
import template from './template.html';
import LocationProvider from '../../models/LocationProvider';

const ViewModel = {
  location: LocationProvider.currentLocation,
  isLoading: ko.computed(() => {
    return LocationProvider.isFetching();
  }),
  initError: ko.computed(() => {
    return LocationProvider.error();
  }),

  initialize() {
    LocationProvider.fetchCurrentLocation();
  },
};

export const App = ViewModel;

export default {
  viewModel: { instance: ViewModel },
  template
};
