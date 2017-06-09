import ko from 'knockout';
import template from './template.html';

const Toast = {
  messages: ko.observableArray(),
};

export function toast(text, level) {
  const className = `toast__message--is-${level}`;
  const message = { text, className };
  const remove = () => {
    Toast.messages(Toast.messages().filter((m) => {
      return m !== message;
    }));
  };
  message.remove = remove;
  Toast.messages.push(message);
  setTimeout(remove, 10000);
}

export default {
  viewModel: { instance: Toast },
  template
};
