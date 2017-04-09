import CommonRankLeft from "./CommonRankLeft";
import TmpAlbum from "./TmpAlbum";

const TAKE_RECORD = 5;

export default class RankAlbumLeft extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      albumVn: [],
      albumUs: [],
      albumKp: [],
    };
  }

  componentDidMount() {
    API.Album.getList(this.handleGetAlbumVnCallback, this.getOption("vn"))
    API.Album.getList(this.handleGetAlbumUsCallback, this.getOption("vn"))
    API.Album.getList(this.handleGetAlbumKpCallback, this.getOption("vn"))
  }

  getOption(type) {
    let include = {
      ranks: {},
      singers: {only: ["id", "name"]},
    };
    return {
      methods: ["get_rank_previous"],
      include: JSON.stringify(include),
      filter: {country: type},
      take: TAKE_RECORD,
    }
  }

  handleGetAlbumVnCallback = (status, data) => {
    if (!status) return;
    this.setState({
      albumVn: data.albums,
    });
  }

  handleGetAlbumUsCallback = (status, data) => {
    if (!status) return;
    this.setState({
      albumUs: data.albums,
    });
  }

  handleGetAlbumKpCallback = (status, data) => {
    if (!status) return;
    this.setState({
      albumKp: data.albums,
    });
  }

  render() {
    let albumVn = this.state.albumVn;
    let albumUs = this.state.albumUs;
    let albumKp = this.state.albumKp;

    return (
      <div className="border-menu-right">
        <div className="label-top">
          BXH Bai Hat
          <i className="material-icons">keyboard_arrow_right</i>
          <i className="material-icons pointer">
            play_circle_outline
          </i>
        </div>
        <CommonRankLeft
          listVn={albumVn}
          titleVn="Top album viet nam"
          listUs={albumUs}
          titleUs="Top album au my"
          listKp={albumKp}
          titleKp="Top album Kpop"
        />
      </div>
    )
  }
}
