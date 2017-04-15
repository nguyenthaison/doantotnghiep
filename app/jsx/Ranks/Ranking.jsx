const TAKE_RECORD = 10;
import CommonRank from "./CommonRank";

export default class Ranking extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listTopVn: [],
      listTopUs: [],
      listTopKp: [],
      albumVn: {},
      albumUs: {},
      albumKp: {},
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
    };
    return {
      methods: ["get_rank_previous"],
      include: JSON.stringify(include),
      filter: {country: type},
      take: TAKE_RECORD,
    }
  }

  getOptionAlbum(type) {
    return {
      filter: {country_author: type},
    }
  }

  handleGetAlbumCallback = (status, data, album) => {
    if (!status) return;
    this.setState({
      [album]: data.albums[0],
    });
  }

  handleGetListCallback = (status, data, list) => {
    if (!status) return;
    this.setState({
      [list]: data.songs,
    });
  }

  render() {
    let listTopVn = this.state.listTopVn;
    let listTopUs = this.state.listTopUs;
    let listTopKp = this.state.listTopKp;

    return (
      <CommonRank
        listVn={listTopVn}
        titleVn="Top music viet nam"
        listUs={listTopUs}
        titleUs="Top music au my"
        listKp={listTopKp}
        titleKp="Top music Kpop"
        albumVn={this.state.albumVn}
        albumUs={this.state.albumUs}
        albumKp={this.state.albumKp}
      />
    )
  }
}
