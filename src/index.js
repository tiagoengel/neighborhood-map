import ko from 'knockout';
import promiseFinally from 'promise.prototype.finally';
import initializeComponents from './components/initialize';
import { App } from './components/App';
import './stylesheets/application.scss';

promiseFinally.shim();
initializeComponents();
ko.applyBindings({});
App.initialize();
