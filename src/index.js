import ko from 'knockout';
import initialize from './components/initialize';
initialize();

const ViewModel = {
  showLoading: ko.observable(true),
  foo: ko.observable('bar'),

  stopLoading() {
    this.showLoading(false);
  }
}
ko.applyBindings(ViewModel);

setTimeout(() => {
  ViewModel.stopLoading();
}, 2000);

