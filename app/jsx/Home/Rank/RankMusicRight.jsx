const TAKE_RECORD = 10;

import CommonRankRight from "./CommonRankRight";

export default class RankMusicRight extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listTopVn: [],
      listTopUs: [],
      listTopKp: [],
      listActive: [],
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
      ranks: {},
    };
    return {
      methods: ["get_rank_previous"],
      include: JSON.stringify(include),
      filter: {country: type},
      take: TAKE_RECORD,
      order_by: "ranks.total_view desc",
    }
  }

  handleGetListVnCallback = (status, data) => {
    if (!status) return;
    this.setState({
      listTopVn: data.songs,
      listActive: data.songs,
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

  handleActive = (listActive) => {
    this.setState({
      listActive: listActive,
    })
  }

  handlePlayAll = () => {
    let listActive = this.state.listActive;
    Helper.transitionTo("/play", {songs: listActive});
  }

  handleViewRankMusic = () => {
    Helper.transitionTo("/Ranks");
  }

  render() {
    let listTopVn = this.state.listTopVn;
    let listTopUs = this.state.listTopUs;
    let listTopKp = this.state.listTopKp;

    return (
      <div className="border-menu-right">
        <div className="label-top">
          <div onClick={this.handleViewRankMusic} className="pointer">
            RANK MUSIC
            <i className="material-icons">keyboard_arrow_right</i>
          </div>
          <i className="material-icons pointer" onClick={this.handlePlayAll}>
            play_circle_outline
          </i>
        </div>
        <CommonRankRight
          listVn={listTopVn}
          titleVn="Top music viet nam"
          listUs={listTopUs}
          titleUs="Top music au my"
          listKp={listTopKp}
          titleKp="Top music Kpop"
          onActive={this.handleActive}
        />
      </div>
    )
  }
}
