import ko from 'knockout';
import template from './template.html';

const ViewModel = {
  messages: ko.observableArray()
};

export function toast(text, level) {
  const className = `toast__message--is-${level}`;
  ViewModel.messages.push({ text, className });
  setTimeout(() => {
    ViewModel.messages.shift();
  }, 10000);
}

export default {
  viewModel: { instance: ViewModel },
  template
};
