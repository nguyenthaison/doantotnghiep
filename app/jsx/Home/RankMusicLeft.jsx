const TAKE_RECORD = 10;
import TmpSongs from "../Songs/TmpSongs";
import CommonRank from "./CommonRank";
import CommonRankLeft from "./CommonRankLeft";

export default class RankMusicLeft extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listTopVn: [],
      listTopUs: [],
      listTopKp: [],
    };
  }

  componentDidMount() {
    API.Song.getList(this.handleGetListVnCallback, this.getOption("vn"));
    API.Song.getList(this.handleGetListUsCallback, this.getOption("vn"));
    API.Song.getList(this.handleGetListKpCallback, this.getOption("vn"));
  }

  getOption(type) {
    let include = {
      singers: {only: ["id", "name"]},
    };
    return {
      methods: ["get_rank_previous"],
      include: JSON.stringify(include),
      filter: {country: type},
      take: TAKE_RECORD,
    }
  }

  handleGetListVnCallback = (status, data) => {
    if (!status) return;
    this.setState({
      listTopVn: data.songs,
    });
  }

  handleGetListUsCallback = (status, data) => {
    this.setState({
      listTopUs: data.songs,
    });
  }

  handleGetListKpCallback = (status, data) => {
    this.setState({
      listTopKp: data.songs,
    });
  }

  render() {
    let listTopVn = this.state.listTopVn;
    let listTopUs = this.state.listTopUs;
    let listTopKp = this.state.listTopKp;

    return (
      <CommonRankLeft
        listVn={listTopVn}
        titleVn="Top music viet nam"
        listUs={listTopUs}
        titleUs="Top music au my"
        listKp={listTopKp}
        titleKp="Top music Kpop"
      />
    )
  }
}
