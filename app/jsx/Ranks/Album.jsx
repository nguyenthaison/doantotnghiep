import CommonRank from "./CommonRank";

const TAKE_RECORD = 10;

export default class NewSong extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      albumVn: [],
      albumUs: [],
      albumKp: [],
    };
  }

  componentDidMount() {
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumVn"),
      this.getOption("vn"));
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumUs"),
      this.getOption("vn"));
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumKp"),
      this.getOption("vn"));
  }

  getOption(type) {
    let include = {
      ranks: {},
      singers: {only: ["id", "name"]},
      songs: {},
    };
    return {
      methods: ["get_rank_previous"],
      include: JSON.stringify(include),
      filter: {country: type},
      take: TAKE_RECORD,
      order_by: "ranks.total_view desc",
    }
  }

  handleGetAlbumCallback = (status, data, albums) => {
    if (!status) return;
    this.setState({
      [albums]: data.albums,
    });
  }

  render() {
    let albumVn = this.state.albumVn;
    let albumUs = this.state.albumUs;
    let albumKp = this.state.albumKp;

    return (
      <CommonRank
        listVn={albumVn}
        titleVn="Top album viet nam"
        listUs={albumUs}
        titleUs="Top album au my"
        listKp={albumKp}
        titleKp="Top album Kpop"
        album={true}
      />
    )
  }
}
