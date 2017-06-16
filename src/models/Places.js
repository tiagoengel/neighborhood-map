import ko from 'knockout';
import { toast } from '../components/Toast';
import GMap from '../GMap';

const allPlaces = ko.observableArray([]);

function Places() {
  this.filter = ko.observable('');
  this.places = ko.computed(function filterPlaces() {
    const filter = this.filter();
    return allPlaces().filter((place) => {
      return place.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  }, this);
}

const instance = new Places();

GMap.onReady(() => {
  GMap.searchNearByPlaces({
    radius: 500,
    type: ['store'] // TODO: better search
  }).then((places) => {
    allPlaces(places);
  }).catch((err) => {
    console.error('Unable to load places', err);
    toast('Oh Snap! We were unable to load near by places. Try again later', 'error');
  });
});

export default instance;
