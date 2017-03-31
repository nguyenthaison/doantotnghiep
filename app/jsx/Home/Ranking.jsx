const TAKE_RECORD = 10;
import TmpSongs from "../Songs/TmpSongs";
import CommonRank from "./CommonRank";

export default class Rank extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listTopVn: [],
      listTopUs: [],
      listTopKp: [],
    };
  }

  componentDidMount() {
    API.Rank.getList(this.handleGetListVnCallback, this.getOption("vn"));
    API.Rank.getList(this.handleGetListUsCallback, this.getOption("us"));
    API.Rank.getList(this.handleGetListKpCallback, this.getOption("kp"));
  }

  getOption(type) {
    let include = {
      song_ranks: {include: {song: { include: {singer_songs: {include: {singer: {}}}}}}},
    };
    return {
      include: JSON.stringify(include),
      filter: {rank_type: type},
      take: TAKE_RECORD,
    }
  }

  handleGetListVnCallback = (status, data) => {
    if (!status) return;
    this.setState({
      listTopVn: TmpSongs,
    });
  }

  handleGetListUsCallback = (status, data) => {
    this.setState({
      listTopUs: TmpSongs,
    });
  }

  handleGetListKpCallback = (status, data) => {
    this.setState({
      listTopKp: TmpSongs,
    });
  }

  render() {
    let listTopVn = this.state.listTopVn;
    let listTopUs = this.state.listTopUs;
    let listTopKp = this.state.listTopKp;

    return (
      <div className="child-tab">
        <CommonRank
          listVn={listTopVn}
          listUs={listTopUs}
          listKp={listTopKp}
        />
      </div>
    )
  }
}
