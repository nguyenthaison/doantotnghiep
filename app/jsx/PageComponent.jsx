class PageComponent extends BaseComponent {
  constructor(props) {
    super(props);
  }

  setToolBar(title, linkTo) {
    App.setToolBarOnHeaderMenu(title, linkTo);
  }

  componentWillUnmount() {
    App.setToolBarOnHeaderMenu();
  }
}

module.exports = PageComponent;
