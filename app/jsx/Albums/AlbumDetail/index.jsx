import Song from "../../PlayMusic/Song";
import ListSongInAlbum from "./ListSongInAlbum";

export default class AlbumDetail extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      songActive: {id: null},
    }
  }

  componentDidMount() {
    this.setToolBar("Play Album");
    let state = Helper.getCurrentLocationState();
    API.Album.get(this.handerGetAlbum, state, {include: JSON.stringify({})});
  }

  handerGetAlbum = (status, data) => {
    if (!status) return;
    this.setState({
      album: data.album,
      songActive: data.album.songs[0],
    });
  }

  handleChangeSongActive = (song) => {
    this.setState({
      songActive: song,
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
    let album = this.state.album;

    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              <div>
                <div className="top-info">
                  <div>{album.name}</div>
                  <div>"Phát hành: "{this.renderInfoTop(album.singers)}</div>
                  <div>{this.renderInfoTop(album.music_types)}</div>
                </div>
              </div>
              <div className="screen-play">
                <Song item={album.songs}
                  album={true}
                  oneSong={false}
                  onChangeSongActive={this.handleChangeSongActive}
                  songActive={this.state.songActive}
                  ref="song" />
              </div>
              <ListSongInAlbum list={album.songs}
                onChangeSongActive={this.handleChangeSongActive}
                songActive={this.state.songActive} />
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

