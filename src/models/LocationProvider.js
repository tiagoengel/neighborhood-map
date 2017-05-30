import ko from 'knockout';
import axios from 'axios';

function html5Location() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Html5 geolocation not supported');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        resolve(`${lat},${long}`);
      }, reject);
    }
  });
}

function ipInfoIOLocation() {
  return axios.get('https://ipinfo.io').then((ipInfo) => {
    return ipInfo.data.loc;
  });
}

const LocationProvider = {
  /**
   * A string with the user's location, formated as 'lat,long`
   */
  currentLocation: ko.observable(null),
  isFetching: ko.observable(false),
  error: ko.observable(null),

  fetchCurrentLocation() {
    this.isFetching(true);
    html5Location()
    .catch((err) => {
      console.error('Failed to load location using HTML5 api, trying ipinfo.io', err);
      return ipInfoIOLocation();
    })
    .then((loc) => {
      this.currentLocation(loc);
    })
    .catch((err) => {
      console.error('Failed to load location', err);
      this.error(err);
    })
    .then(() => this.isFetching(false));
  }
};

export default LocationProvider;
