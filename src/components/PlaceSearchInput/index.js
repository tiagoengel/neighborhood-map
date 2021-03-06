import ko from 'knockout';
import { debounce } from 'lodash';
import template from './template.html';
import Places from '../../models/Places';

const ViewModel = new (function ViewModel() {
  this.value = ko.observable();
  this.hasFilter = ko.computed(() => {
    return !!this.value();
  });

  this.clearFilter = function clearFilter() {
    this.value('');
  };
})();

const doFilter = debounce((filter) => {
  Places.filter(filter);
}, 500);

ViewModel.value.subscribe(doFilter);

export default {
  viewModel: { instance: ViewModel },
  template
};
