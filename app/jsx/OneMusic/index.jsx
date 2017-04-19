import Song from "../PlayMusic/Song";
import FileDownload from "material-ui/svg-icons/file/file-download";
import Feedback from "material-ui/svg-icons/action/feedback";
import Add from "material-ui/svg-icons/content/add";
import Done from "material-ui/svg-icons/action/done";
import Share from "material-ui/svg-icons/social/share";
import ContentLeft from "./ContentLeft";

const TAKE_RECORD_ALBUM = 10;
const TAKE_RECORD_SONG_RELATED = 20;

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      song: null,
      albums: [],
      songs: [],
      favorite_articles: [],
    }
  }

  componentDidMount() {
    let state = Helper.getCurrentLocationState();
    this.getList(state);
  }

  componentWillReceiveProps(nextProps) {
   let state = Helper.getCurrentLocationState();
    this.getList(state);
  }

  getList(id) {
    API.Song.get((status, data) => this.handlerGetData(status, data, "song"), id,
      {include: JSON.stringify({})});
    API.Album.getList((status, data) => this.handlerGetData(status, data, "albums"),
      this.getOptionAlbum(id));
    API.Song.getList((status, data) => this.handlerGetData(status, data, "songs"),
      this.getOptionSongRelated(id));
    API.FavoriteArticle.getList((status, data) => this.handlerGetData(status, data, "favorite_articles"));
  }

  getOptionAlbum(state) {
    let include = {
      singers: {only: ["id", "name"]},
    };

    return {
      include: JSON.stringify(include),
      filter: {song: state, creator: "member"},
      take: TAKE_RECORD_ALBUM,
    }
  }

  getOptionSongRelated(state) {
    let include = {
      singers: {only: ["id", "name"]},
    };

    return {
      include: JSON.stringify(include),
      filter: {music_type: state},
      take: TAKE_RECORD_SONG_RELATED,
    }
  }

  handlerGetData = (status, data, name) => {
    if (!status) return;
    this.setState({
      [name]: data[name],
    })
  }

  handleDownload = (id) => {
    window.open(`/api/v1/download/${id}`, "_self");
  }

  handleCareSinger = (event, singer, favorite) => {
    if (favorite) {
      Helper.showConfirm(
        "", "Are you sure?",
        () => this.handleConfirmDelete(favorite));

      event.stopPropagation();
    } else {
      let favorite_article = {};
      favorite_article["article_type"] = "singer";
      favorite_article["article_id"] = singer.id;
      API.FavoriteArticle.create(this.handleFavoriteSinger, favorite_article)
    }
  }

  handleConfirmDelete = (favorite) => {
    API.FavoriteArticle.delete((status, data) => this.handleFavoriteSinger(status, data, favorite),
      favorite.id)
  }

  handleFavoriteSinger = (status, data, favorite) => {
    if (status) {
      if (favorite) {
        Helper.showMessage("Oke! You don't care");
      }
      API.FavoriteArticle.getList((status, data) => this.handlerGetData(status, data, "favorite_articles"));
    }
  }

  handlePlayAlbum = (album) => {
    Helper.transitionTo("/album", album.id);
  }

  handleViewSinger = (singers) => {
    Helper.transitionTo("/singers", singers[0]);
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
    let favoriteArticles = this.state.favorite_articles;
    const checkFavorite = favoriteArticles.findIndex(item =>
      item.user_id === App.auth.id && item.article_id === singer.id);
    let numberFavorite = 0;
    favoriteArticles.map((item, index) => {
      if (item.article_id === singer.id) {numberFavorite += 1}
    });

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
                icon={checkFavorite > -1 ? <Done /> : <Add />}
                className="follow-singer"
                primary={true}
                onClick={(event) => this.handleCareSinger(event, singer, favoriteArticles[checkFavorite])}/>
              <span>{numberFavorite}</span>
            </div>
            <div className="content">
              {singer.content}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderAlbum(singer) {
    let albums = this.state.albums;
    if (!albums) return null;

    return (
      <div className="albums">
        {<span className="title"><h1>{"Album " + singer.name}</h1></span>}
        <div className="album-list">
          {albums.map((album) => {
            let singerName = album.singers.length > 1 ? "Many artists" : singer.name;

            return (
              <div key={album.id} onClick={() => this.handlePlayAlbum(album)}>
                <div className="img-album pointer">
                  <img src="/images/logo.jpg" />
                </div>
                <div>
                  <span className="pointer" onClick={() => this.handlePlayAlbum(album)}>
                    {album.name}
                  </span>
                </div>
                <div>
                  <span className="pointer" onClick={() => this.handleViewSinger(album.singers)}>
                    {singerName}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    let song = this.state.song;
    if (!song) return null;
    let listSongRelated = this.state.songs;
    let singer = song.singers[0]

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
                <Song item={song} album={false} oneSong={true} position={0} />
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
              {this.renderSinger(song.singers[0])}
              {this.renderAlbum(singer)}
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="row">
              <ContentLeft listRelated={listSongRelated}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
