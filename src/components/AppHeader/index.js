import template from './template.html';

function ViewModel(params) {
  this.onClickMenu = params.onClickMenu;
}

export default {
  viewModel: ViewModel,
  template
};
