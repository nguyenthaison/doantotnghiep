import Song from "../PlayMusic/Song";
import FileDownload from "material-ui/svg-icons/file/file-download";
import Feedback from "material-ui/svg-icons/action/feedback";
import Add from "material-ui/svg-icons/content/add";
import Share from "material-ui/svg-icons/social/share";

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
      // author_songs: {only: ["id", "name"]},
      authors: {only: ["id", "name"]},
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

  handleDownload = (id) => {
    window.open(`/api/v1/download/${id}`, "_self");
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

  renderButtonAction(label, icon, handleAction) {
    return (
      <cm.RaisedButton
        icon={icon}
        primary={true}
        labelPosition="after"
        label={label}
        className="submit-upload"
        onTouchTap={handleAction}
        title={label} />
    )
  }

  render() {
    let song = this.state.song;

    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              <div className="play-song">
                <div className="top-info">
                  <div>{song.name}</div>
                  <div>"Phát hành: "{this.renderInfoTop(song.singers)}</div>
                </div>
                <Song item={song} album={false} oneSong={true} />
                <div className="action">
                  {this.renderButtonAction("Add To", <Add />)}
                  {this.renderButtonAction("Download", <FileDownload />,
                    ()=>this.handleDownload(song.id))}
                  {this.renderButtonAction("Feedback", <Feedback />)}
                  {this.renderButtonAction("Share", <Share />)}
                </div>
              </div>
              <div className="author">

              </div>

              <div className="lyrics">
                {song.lyrics && song.lyrics.length > 0 ? song.lyrics[0].content : null}
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
