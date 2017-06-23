import ko from 'knockout';
import template from './template.html';

const ViewModel = {
  visible: ko.observable(true),

  open() {
    this.visible(true);
  },

  close() {
    this.visible(false);
  },

  toggle() {
    this.visible(!this.visible());
  }
};

export const Sidebar = ViewModel;

export default {
  viewModel: { instance: ViewModel },
  template
};
