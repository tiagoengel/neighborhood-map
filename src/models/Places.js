import ko from 'knockout';
import { toast } from '../components/Toast';
import GMap from '../GMap';

const Places = new (function Places() {
  this.allPlaces = ko.observableArray([]);
  this.filter = ko.observable('');
  this.places = ko.computed(function filterPlaces() {
    const filter = this.filter();
    return this.allPlaces().filter((place) => {
      return place.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  }, this);
})();

GMap.onReady(() => {
  GMap.searchNearByPlaces({
    radius: 500,
    type: ['store']
  }).then((places) => {
    Places.allPlaces(places.sort((a, b) => (b.rating || 0) - (a.rating || 0)));
  }).catch((err) => {
    console.error('Unable to load places', err);
    toast('Oh Snap! We were unable to load nearby places. Try again later', 'error');
  });
});

export default Places;
