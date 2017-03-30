import TmpSongs from "../../Songs/TmpSongs";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listVn: [],
      ListUs: [],
      ListKp: [],
    };
  }

  componentDidMount() {
    API.Song.getList(this.handleGetListVnCallback, this.getOption("vn"))
    API.Song.getList(this.handleGetListUsCallback, this.getOption("us"))
    API.Song.getList(this.handleGetListKpCallback, this.getOption("kp"))
  }

  getOption(type) {
    return {
      filter: {music_type: type},
    }
  }

  handleGetListVnCallback = (status, data) => {
    if (!status) return;
    this.setState({
      listVn: TmpSongs,
    });
  }

  handleGetListUsCallback = (status, data) => {
    if (!status) return;
    this.setState({
      ListUs: TmpSongs,
    });
  }

  handleGetListKpCallback = (status, data) => {
    if (!status) return;
    this.setState({
      ListKp: TmpSongs,
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
