import NewSong from "./NewSong";
import Singer from "./Singer";
import Ranking from "./Ranking";
import Album from "./Album";
import RankMusicRight from "./Rank/RankMusicRight";
import RankAlbumRight from "./Rank/RankAlbumRight";
import AlbumCenter from "./AlbumCenter";

export default class Home extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setToolBar("Home");
  }

  handleViewTopic = () => {

  }

  renderLabel(title) {
    return (
      <div className="home-topic">
        <h2><span className="pointer" onClick={this.handleViewTopic}>
          {title}<i className="material-icons">keyboard_arrow_right</i>
        </span></h2>
      </div>
    )
  }

  render() {
    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              {this.renderLabel("New Album")}
              <div className="new-song">
                <AlbumCenter />
              </div>
              {/*this.renderLabel("New Song")*/}
              {/*<div className="new-song">
                <NewSong />
              </div>*/}
              {/*this.renderLabel("Ranking Music")*/}
              {/*<div className="bxh">
                <Ranking />
              </div>*/}
              {/*this.renderLabel("Ranking Album")*/}
              {/*<div className="bxh">
                <Album />
              </div>*/}
              {this.renderLabel("New Song")}
              <div className="new-song">
                <Singer />
              </div>
              {this.renderLabel("Hot Singer")}
              <div className="new-song">
                <Singer />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="home-left">
                <RankMusicRight />
                <RankAlbumRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
