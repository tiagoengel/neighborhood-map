import ko from 'knockout';
import $ from 'jquery';

function render(component, params) {
  const prevNode = document.getElementById('test-container');
  if (prevNode) {
    document.body.removeChild(prevNode);
  }
  const node = document.createElement('div');
  node.setAttribute('id', 'test-container');
  const ViewModel = component.viewModel;
  const instance = new ViewModel(params);
  node.innerHTML = component.template; //eslint-disable-line
  document.body.appendChild(node);
  ko.applyBindings(instance, node);
  return [node, instance];
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
  const createSubject = (currentParams) => {
    const [node, instance] = render(component, currentParams);
    window.subject = instance;
    subject.node = $(node);
    subject.params = params;
    subject.setParams = createSubject;
  };

  before(() => {
    createSubject(params);
  });

  after(() => {
    ko.cleanNode(subject.node);
    delete window.subject;
  });
}
