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

/**
 * Configures the current test suite to test a knockout component.
 * The component is mounted on a real DOM node and the variable `subject`
 * is exposed with the component's instance. This variable can be used to make
 * assertions and test the component.
 *
 * `subject.node` exposes a jquery object with the node the component is
 * currently mounted in.
 * `subject.params` exposes the params that were provided to the component.
 *
 * Example:
 *
 *   koSuite(Component, { name: ko.observable('foo' )})
 *
 *   // in a test
 *   expect(subject.node.find('p').text()).to.eq('foo')
 *   subject.params.name('bar')
 *   expect(subject.node.find('p').text()).to.eq('bar')
 *
 * @param {object} component the knockout component.
 * @param {object} params the list of params for the component.
 */
export default function koSuite(component, params) {
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
