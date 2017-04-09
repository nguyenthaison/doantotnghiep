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
    };
    return {
      methods: ["get_rank_previous"],
      include: JSON.stringify(include),
      filter: {country: type},
      take: TAKE_RECORD,
      order_by: "id asc",
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
    Helper.transitionTo("/song", this.state.listActive);
  }

  render() {
    let listTopVn = this.state.listTopVn;
    let listTopUs = this.state.listTopUs;
    let listTopKp = this.state.listTopKp;

    return (
      <div className="border-menu-right">
        <div className="label-top">
          RANK MUSIC
          <i className="material-icons">keyboard_arrow_right</i>
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
