import ko from 'knockout';
import $ from 'jquery';

function render(component, params) {
  const prevNode = document.getElementById('test-container');
  if (prevNode) {
    document.body.removeChild(prevNode);
  }
  const node = document.createElement('div');
  node.setAttribute('id', 'test-container');
  let instance = null;
  if (component.viewModel.instance) {
    instance = component.viewModel.instance;
    // For singletons we just replace params with a different value as there's
    // no other way of redefining it
    Object.keys(params).forEach((paramName) => {
      instance[paramName] = params[paramName];
    });
    if (component.viewModel.initializers) {
      component.viewModel.initializers.forEach(fn => fn());
    }
  } else {
    const ViewModel = component.viewModel;
    instance = new ViewModel(params);
  }
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
 *   koSuite(Component, { name: 'foo' })
 *
 *   // in a test
 *   expect(subject.node.find('p').text()).to.eq('foo')
 *   subject.setParams({ name: 'bar' })
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
    subject.setParams = (newParams) => {
      if (component.viewModel.instance) {
        throw new Error("You can't call setParams on a singleton component");
      }
      return createSubject(newParams);
    };
  };

  beforeEach(() => {
    createSubject(params);
  });

  afterEach(() => {
    ko.cleanNode(subject.node);
    delete window.subject;
  });
}
