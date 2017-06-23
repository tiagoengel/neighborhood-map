import ko from 'knockout';
import moment from 'moment';
import template from './template.html';
import FourSquare from '../../FourSquare';

function getTopFive(tips) {
  return tips.sort((a, b) => {
    const createdAtDiff = b.createdAt - a.createdAt;
    return createdAtDiff !== 0
      ? createdAtDiff
      : b.agreeCount - a.agreeCount;
  }).slice(0, 4);
}

function doFetchTips(place) {
  return FourSquare
    .searchVenue(place)
    .then((venue) => {
      if (venue) {
        return FourSquare.getTips(venue)
          .then(getTopFive);
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
      return cache[place.id];
    }
    viewModel.isLoading(true);
    cache[place.id] = doFetchTips(place).finally(() => {
      viewModel.isLoading(false);
    });
    return cache[place.id];
  };
})();

function ViewModel(params) {
  this.isLoading = ko.observable(false);
  this.isVisible = params.visible;
  this.tips = ko.observableArray();
  this.noTips = ko.computed(() => {
    return this.tips().length === 0 && !this.isLoading();
  });

  params.visible.subscribe((visible) => {
    if (visible) {
      fetchTips(params.place, this).then((tips) => {
        this.tips(tips);
      });
    }
  });

  this.getCreatedAt = function getCreatedAt(tip) {
    return moment(tip.createdAt * 1000).format('LL');
  };

  this.onClickFoursquareLink = (viewModel, e) => {
    // this is needed otherwise knockout somehow 'eats'
    // this event and only triggers the on click event in the
    // places list.
    e.stopPropagation();
    return true;
  };
}

export default {
  viewModel: ViewModel,
  template
};
