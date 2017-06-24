import ko from 'knockout';
import $ from 'jquery';

const nextId = (() => {
  let id = 0;
  return () => {
    return id++; //eslint-disable-line
  };
})();

function expose(key, value) {
  if (value !== undefined) {
    window[key] = value;
  } else {
    delete window[key];
  }
}

function wrappedComponent(component) {
  return function WrappedTestComponent(params) {
    const ViewModel = component.viewModel;
    const instance = new ViewModel(params);
    expose('subject', instance);
    return instance;
  };
}

function render(node, name, params) {
  const htmlParams = Object.keys(params).map(key => `${key}: ${key}`);
  node.innerHTML = `<${name} params="${htmlParams}"></${name}>`; //eslint-disable-line
  document.body.appendChild(node);
  return node;
}

export default function koSuite(test, component, params) {
  const name = `test-component-${nextId()}`;
  const testContainer = document.createElement('div');

  before(() => {
    const testComponent = wrappedComponent(component);
    const template = component.template;
    const node = render(testContainer, name, params);
    ko.components.register(name, {
      viewModel: testComponent,
      template,
      synchronous: true
    });
    ko.applyBindings(params);
    subject.node = $(node);
    subject.params = params;
  });

  after(() => {
    ko.components.unregister(name);
    ko.cleanNode(testContainer);
    expose('subject', undefined);
  });
}
