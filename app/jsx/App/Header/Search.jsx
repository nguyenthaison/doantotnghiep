export default class Search extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      textSearch: "",
    }

    this.typingQuery = "";
  }

  handleSearch = () => {
    this.setState({
      textSearch: this.typingQuery,
    });
    Helper.transitionTo("/search/songs", {textSearch: this.typingQuery});
  }

  handleKeyDownSearch = (event) => {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  }

  handleChangeTextSearch = (event) => {
    this.typingQuery = event.target.value;
  }

  render() {
    return (
      <mui.TextField className="input-search"
        hintText={t("common.search")}
        onKeyDown={this.handleKeyDownSearch}
        onChange={(event) => this.handleChangeTextSearch(event)}/>
    )
  }
}
