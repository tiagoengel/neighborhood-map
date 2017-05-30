import ko from 'knockout';
import template from './template.html';
import LocationProvider from '../../models/LocationProvider';

const ViewModel = {
  location: ko.observable(LocationProvider),

  initialize() {
    LocationProvider.fetchCurrentLocation();
  },
};

export const App = ViewModel;

export default {
  viewModel: { instance: ViewModel },
  template
};
