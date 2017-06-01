import ko from 'knockout';
import initializeComponents from './components/initialize';
import { App } from './components/App';
import './stylesheets/application.scss';

initializeComponents();
ko.applyBindings({});
App.initialize();
