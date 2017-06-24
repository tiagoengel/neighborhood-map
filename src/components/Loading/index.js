import ko from 'knockout';
import template from './template.html';

function ViewModel(params) {
  this.isLoading = ko.observable(params.isLoading || false);
}

export default {
  viewModel: ViewModel,
  template
};
