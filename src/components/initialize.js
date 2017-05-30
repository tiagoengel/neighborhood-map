import { kebabCase } from 'lodash';
import ko from 'knockout';

const loadComponent = require.context('./', true, /index.js$/);

function getComponentName(file) {
  const name = file.split('/')[1];
  return kebabCase(name);
}

/**
 * Loads up and register all knockouts components, this functions assumes
 * every component exports an object containing a valid knock component.
 *
 * Example:
 *
 *    {
 *      viewModel: [Function],
 *      template: 'html'
 *    }
 *
 * The component folder structure should follow this convention.
 *
 *    `[ComponentName]/index.js`.
 *
 * The component name will be the folder name using kebab case, for example,
 * `ComponentName` will become `component-name`.
 */
export default function initialize() {
  loadComponent.keys().forEach((file) => {
    const component = loadComponent(file);
    const componentName = getComponentName(file);
    ko.components.register(componentName, component.default);
  });
}
