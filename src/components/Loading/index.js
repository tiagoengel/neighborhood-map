import 'spinkit/css/spinners/3-wave.css';
import ko from 'knockout';
import template from './template.html';

function ViewModel(params) {
  this.isLoading = ko.observable(params.isLoading || false);
  this.isFullScreen = ko.observable(params.isFullScreen || false);
}

export default {
  viewModel: ViewModel,
  template
};
