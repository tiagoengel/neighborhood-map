import ko from 'knockout';
import initializeComponents from './components/initialize';
import { App } from './components/App';

initializeComponents();
ko.applyBindings({});
App.initialize();
