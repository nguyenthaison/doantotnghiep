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
      albumVn: {},
      albumUs: {},
      albumKp: {},
      albumActive: null,
    };
  }

  componentDidMount() {
    API.Song.getList((status, data) => this.handleGetListCallback(status, data, "listTopVn"),
      this.getOption("vn"));
    API.Song.getList((status, data) => this.handleGetListCallback(status, data, "listTopUs"),
      this.getOption("vn"));
    API.Song.getList((status, data) => this.handleGetListCallback(status, data, "listTopKp"),
      this.getOption("vn"));
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumVn"),
      this.getOptionAlbum("vn"));
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumUs"),
      this.getOptionAlbum("vn"));
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumKp"),
      this.getOptionAlbum("vn"));
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

  getOptionAlbum(type) {
    return {
      filter: {country_author: type},
    }
  }

  handleGetListCallback = (status, data, list) => {
    if (!status) return;
    this.setState({
      [list]: data.songs,
    });
  }

  handleGetAlbumCallback = (status, data, album) => {
    if (!status) return;
    this.setState({
      [album]: data.albums,
    });
  }

  handleActive = (country) => {
    let listActive = [];
    let albumActive = {};
    switch(country) {
    case "kp":
      listActive = this.state.listKp;
      albumActive = this.state.albumKp;
      break;
    case "us":
      listActive = this.state.listUs;
      albumActive = this.state.albumUs;
      break;
    default:
      listActive = this.state.listVn;
      albumActive = this.state.albumVn;
    }

    this.setState({
      listActive: listActive,
      albumActive: albumActive,
    })
  }

  handlePlayAll = () => {
    if (this.state.albumActive) {
      Helper.transitionTo("/album", this.state.albumActive[0].id);
    } else {
      Helper.transitionTo("/album", this.state.albumVn[0].id);
    }
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
