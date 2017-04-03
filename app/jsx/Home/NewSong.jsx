import TmpSongs from "../Songs/TmpSongs";
import CommonRank from "./CommonRank";

export default class NewSong extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listVn: [],
      listUs: [],
      listKp: [],
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
      listUs: TmpSongs,
    });
  }

  handleGetListKpCallback = (status, data) => {
    if (!status) return;
    this.setState({
      listKp: TmpSongs,
    });
  }

  render() {
    let listVn = this.state.listVn;
    let listUs = this.state.listUs;
    let listKp = this.state.listKp;

    return (
      <CommonRank
        listVn={listVn}
        listUs={listUs}
        listKp={listKp}
      />
    )
  }
}
