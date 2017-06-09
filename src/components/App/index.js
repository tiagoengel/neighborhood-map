import ko from 'knockout';
import template from './template.html';
import LocationProvider from '../../models/LocationProvider';
import { Sidebar } from '../Sidebar';

const ViewModel = {
  location: LocationProvider.currentLocation,
  sidebarVisible: Sidebar.visible,
  isLoading: ko.computed(() => {
    return LocationProvider.isFetching();
  }),
  initError: ko.computed(() => {
    return LocationProvider.error();
  }),

  initialize() {
    LocationProvider.fetchCurrentLocation();
  },

  toggleSidebar() {
    Sidebar.toggle();
  }
};

export const App = ViewModel;

export default {
  viewModel: { instance: ViewModel },
  template
};
