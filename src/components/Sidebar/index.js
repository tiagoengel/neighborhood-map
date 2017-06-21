import ko from 'knockout';
import template from './template.html';

const width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);

const ViewModel = {
  visible: ko.observable(width > 600),

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
