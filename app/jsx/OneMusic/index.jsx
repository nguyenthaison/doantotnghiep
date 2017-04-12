import Song from "../PlayMusic/Song";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      song: {},
    }
  }

  componentDidMount() {
    let state = Helper.getCurrentLocationState();
    API.Song.get(this.handerGetAlbum, state, this.getOption());
  }

  getOption() {
    let include = {
      music_types: {},
      author_songs: {only: ["id", "name"]},
      albums: {only: ["id", "name"]},
      singers: {only: ["id", "name"]},
      lyrics: {include: {user: {only: ["id", "name"]}}},
    };
    return {
      include: JSON.stringify(include),
    }
  }

  handerGetAlbum = (status, data) => {
    if (!status) return;
    this.setState({
      song: data.song,
    })
  }

  renderInfoTop(list) {
    if (!list) return;
    return (
      <div>
        {list.map((item) => {
          return (
            <div key={item.id}>{item.name}</div>
          )
        })}
      </div>
    )
  }

  render() {
    let song = this.state.song;

    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              <div>
                <div className="top-info">
                  <div>{song.name}</div>
                  <div>"Phát hành: "{this.renderInfoTop(song.singers)}</div>
                </div>
                <Song item={song} album={false} oneSong={true} />
              </div>
              <div className="author">
              </div>
              <div className="lyrics">
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="home-left">

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
