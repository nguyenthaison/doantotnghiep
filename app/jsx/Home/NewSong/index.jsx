export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listVN: [],
      ListUSUK: [],
    };
  }

  componentDidMount() {
    API.Song.getList(this.handleGetListVNCallback, this.getOptionVn())
    API.Song.getList(this.handleGetListUsukCallback, this.getOptionUsuk())
  }

  getOptionVn() {
    return {
      filter: {music_type: "Viet Nam"},
    }
  }

  getOptionUsuk() {
    return {
      filter: {music_type: "Au my"},
    }
  }

  handleGetListVNCallback = (status, data) => {
    if (!status) return;
    this.setState({
      listVN: data.list,
    });
  }

  handleGetListUsukCallback = (status, data) => {
    if (!status) return;
    this.setState({
      ListUSUK: data.list,
    });
  }

  render() {
    return (
      <div className="child-tab">
        new song
      </div>
    )
  }
}
