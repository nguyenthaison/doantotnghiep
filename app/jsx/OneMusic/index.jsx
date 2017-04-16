import Song from "../PlayMusic/Song";
import FileDownload from "material-ui/svg-icons/file/file-download";
import Feedback from "material-ui/svg-icons/action/feedback";
import Add from "material-ui/svg-icons/content/add";
import Share from "material-ui/svg-icons/social/share";

const TAKE_RECORD = 10;

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      song: {},
      albums: [],
    }
  }

  componentDidMount() {
    let state = Helper.getCurrentLocationState();
    API.Song.get((status, data) => this.handerGetData(status, data, "song"), state, {include: JSON.stringify({})});
    API.Album.getList((status, data) => this.handerGetData(status, data, "albums"), this.getOption(state));
  }

  getOption(state) {
    return {
      filter: {song: state, creator: "member"},
      take: TAKE_RECORD,
    }
  }

  handerGetData = (status, data, name) => {
    if (!status) return;
    this.setState({
      [name]: data[name],
    })
  }

  handleDownload = (id) => {
    window.open(`/api/v1/download/${id}`, "_self");
  }

  handleCareSinger = (singer) => {
    console.log(App.auth.id);
    // API.FavoriteArticle.create(this.handleFavoriteSinger, singer)
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

  renderButtonAction(label, icon, className, handleAction) {
    return (
      <cm.RaisedButton
        icon={icon}
        primary={true}
        labelPosition="after"
        label={label}
        className={"action-song " + className}
        onTouchTap={handleAction}
        title={label} />
    )
  }

  renderSinger(singer) {
    return (
      <div className="singer">
        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="image-singer">
                <div className="border-image-singer">
                  <img src="/images/logo.jpg" />
                </div>
              </div>
            </div>
        </div>
        <div className="col-md-9 col-lg-9 col-sm-9 col-xs-12">
          <div className="row">
            <div className="info-singer">
              <span className="name-singer">
                {singer.name}
              </span>
              <cm.RaisedButton
                icon={<Add />}
                className="follow-singer"
                primary={true}
                onClick={() => this.handleCareSinger(singer)}/>
              </div>
              <div className="content">
                {singer.content}
              </div>
            </div>
        </div>
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
              <div className="play-song">
                <div className="top-info">
                  <h1 className="play-song-label">{song.name}</h1>
                  {/*<div>"Phát hành: "{this.renderInfoTop(song.singers)}</div>*/}
                </div>
                <Song item={song} album={false} oneSong={true} />
                <div className="action-play-song">
                  {this.renderButtonAction("Add To", <Add />, "add-to")}
                  {this.renderButtonAction("Download", <FileDownload />, "download",
                    ()=>this.handleDownload(song.id))}
                  {this.renderButtonAction("Feedback", <Feedback />, "feedback")}
                  {this.renderButtonAction("Share", <Share />, "share")}
                </div>
              </div>
              <div className="author">

              </div>

              <div className="lyrics">
                {song.lyrics && song.lyrics.length > 0 ? song.lyrics[0].content : null}
              </div>
              {song.singers ? this.renderSinger(song.singers[0]) : null}
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
