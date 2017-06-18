import ko from 'knockout';
import template from './template.html';
import FourSquare from '../../FourSquare';

function doFetchTips(place) {
  return FourSquare
    .searchVenue(place)
    .then((venue) => {
      if (venue) {
        return FourSquare.getTips(venue);
      }
      return [];
    });
}

/**
 * Function that only issues a fetch request for tips once per place.
 * If a fetching is necessary, isLoading will be set to true while the
 * fetching is being executed.
 *
 * @param {Object} place the place to fetch tips for.
 * @param {Object} viewModel this component view model.
 */
const fetchTips = (() => {
  const cache = {};
  return (place, viewModel) => {
    if (cache[place.id]) {
      return;
    }
    let finished = false;
    // Only shows the progress component
    // if fetching does not finish before 500ms
    setTimeout(() => {
      if (!finished) {
        viewModel.isLoading(true);
      }
    }, 500);
    cache[place.id] = doFetchTips(place)
      .then((tips) => {
        viewModel.tips(tips);
        return tips;
      })
      .finally(() => {
        finished = true;
        viewModel.isLoading(false);
      });
  };
})();

function ViewModel(params) {
  this.isLoading = ko.observable(false);
  this.isVisible = params.visible;
  this.tips = ko.observableArray();

  params.visible.subscribe((visible) => {
    if (visible) {
      fetchTips(params.place, this);
    }
  });
}

export default {
  viewModel: ViewModel,
  template
};
