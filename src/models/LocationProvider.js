import ko from 'knockout';
import $ from 'jquery';
import { toast } from '../components/Toast';

function html5Location() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Html5 geolocation not supported');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        resolve({ lat, lng });
      }, reject);
    }
  });
}

function ipInfoIOLocation() {
  return $.getJSON('https://ipinfo.io').then((ipInfo) => {
    const [lat, lng] = ipInfo.loc.split(',');
    return { lat: parseFloat(lat, 10), lng: parseFloat(lng, 10) };
  });
}

const LocationProvider = {
  /**
   * An object representing the current location. { lat, lng }
   */
  currentLocation: ko.observable(null),
  isFetching: ko.observable(false),
  error: ko.observable(null),

  fetchCurrentLocation() {
    this.isFetching(true);
    return html5Location()
    .catch((err) => {
      console.error('Failed to load location using HTML5 api, trying ipinfo.io', err);
      return ipInfoIOLocation();
    })
    .then((loc) => {
      this.currentLocation(loc);
    })
    .catch((err) => {
      console.error('Failed to load location', err);
      toast("Oh Snap! We weren't able to find your location :/", 'error');
      this.error(err);
    })
    .then(() => {
      this.isFetching(false);
    });
  }
};

export default LocationProvider;
