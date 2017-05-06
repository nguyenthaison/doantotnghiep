import Song from "../../PlayMusic/Song";

export default class PlayListDetail extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      playList: {},
      songActive: {id: null},
    }
  }

  componentDidMount() {
    let state = Helper.getCurrentLocationState();
    this.getPlayList(state);
  }

  getPlayList(playList) {
    this.setState({
      playList: playList,
      songActive: playList.songs[0],
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
    let playList = this.state.playList;

    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              <div>
                <div className="top-info">
                  <div>{playList.name}</div>
                  <div>Creator: </div>
                </div>
              </div>
              <div className="screen-play">
                {playList.songs && playList.songs.length == 0 ? "khong co gi" :
                  <Song item={playList.songs}
                    songActive={this.state.songActive}
                    onChangeSongActive={this.handleChangeSongActive}
                    album={true}
                    oneSong={false} />
                }
              </div>
              <div className="list-music">
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

