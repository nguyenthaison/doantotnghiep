export default class Songs extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      error: "",
    }
  }

  componentDidMount() {
    API.Song.getList(this.handleCallbackList)
  }

  handleCallbackList = (status, data) => {
    if (!status) return;
    this.setState({
      list: data
    })
  }

  render() {
    return (
      <div className="base-master-index">
      "nguyen thai son"
      </div>
    );
  }
}
