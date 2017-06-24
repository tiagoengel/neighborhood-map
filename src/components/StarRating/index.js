import ko from 'knockout';
import { get } from 'utils/ko';
import template from './template.html';

function StarRating({ rating }) {
  this.stars = ko.computed(() => {
    const classes = ['fa-star-o', 'fa-star-o', 'fa-star-o', 'fa-star-o', 'fa-star-o'];
    const normalized = Math.min(get(rating), 5);
    const decimal = normalized - parseInt(normalized, 10);

    for (let i = 0; i < normalized; i++) { // eslint-disable-line
      classes[i] = 'fa-star';
    }
    if (decimal > 0) {
      classes[parseInt(normalized, 10)] = 'fa-star-half-o';
    }
    return classes;
  });
}

export default {
  viewModel: StarRating,
  template
};
