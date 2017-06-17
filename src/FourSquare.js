import axios from 'axios';
import qs from 'qs';

const CLIENT_ID = 'ARIM40GBMLTOGC0DRQ0003ICTVTMY0AZSC55F33T2HKHZ3G0';
const CLIENT_SECRET = 'JG2D0PIFMJ21XHVXRACU4JNVVPIP1DU2K0Y2FAAHWPP2VNF4';
const URL = 'https://api.foursquare.com/v2';

function version() {
  const pl = (val) => {
    const str = `${val}`;
    return `${'00'.substring(0, 2 - str.length)}${str}`;
  };
  const date = new Date();
  return `${pl(date.getFullYear())}${pl(date.getMonth() + 1)}${pl(date.getDate())}`;
}

function credentials() {
  return {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    v: version()
  };
}

/**
 * Search a venue based on a google maps place.
 *
 * @param {Object} place google maps place object.
 *
 * @returns {Object} the first venue found or null;
 */
function searchVenue(place) {
  const location = place.geometry.location;
  const args = Object.assign(credentials(), {
    ll: `${location.lat()},${location.lng()}`,
    query: place.name,
    intent: 'match'
  });
  return axios
    .get(`${URL}/venues/search?${qs.stringify(args)}`)
    .then((response) => {
      return response.data.response.venues[0];
    });
}

/**
 * Get a list of tips for this venue.
 *
 * @param {Object} venue a venue object.
 *
 * @returns {Array} list of tips for this venue.
 */
function getTips(venue) {
  const args = credentials();
  return axios
    .get(`${URL}/venues/${venue.id}/tips?${qs.stringify(args)}`)
    .then((response) => {
      return response.data.response.tips.items;
    });
}

export default {
  searchVenue,
  getTips
};
