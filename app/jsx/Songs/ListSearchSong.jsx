import Add from "material-ui/svg-icons/content/add";
import FileDownload from "material-ui/svg-icons/file/file-download";
import Popover from "../Albums/AlbumDetail/Popover";

export default class ListSearchSong extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      playLists: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === "songs") {
      API.Song.getList(this.handleGetListSearch, this.getOption(nextProps.query));
      API.PlayList.getList(this.handleGetList, this.getOptionPlaylist());
    }
  }

  getList() {
    API.PlayList.getList(this.handleGetList, this.getOptionPlaylist());
  }

  getOptionPlaylist() {
    let include = {
      songs: {
        include: {
          singers: {only: ["id", "name"]},
          play_list_songs: {},
        }
      },
      play_list_songs: {},
    }

    return {
      include: JSON.stringify(include),
      filter: {user_id: App.auth.id},
      order_by: "id asc",
    }
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      playLists: data.play_lists,
    })
  }

  getOption(query) {
    let include = {
      user: {only: ["id", "name"]},
      music_types: {only: ["name"]},
      singers: {only: ["id", "name"]},
    }
    return {
      search_query: query.textSearch,
      include: JSON.stringify(include),
    }
  }

  handleGetListSearch = (status, data) => {
    if (!status) return;
    this.setState({
      songs: data.songs,
    });
  }

  handleAddToPlayList = (event, song) => {
    this.refs.popover.open({currentTarget: event.currentTarget, song: song});
    event.preventDefault();
  }

  handleDownloadSong = (id) => {
    window.open(`/api/v1/download/${id}`, "_self");
  }

  handleEventListener = () => {
    this.getList();
  }

  renderMusicType(song) {

  }

  renderSinger(item) {
    let singers = item.singers;

    return (
      <div>
        {singers.map((singer, index) => {
          let singerName = index === singers.length - 1 ? singer.name : singer.name + ", ";
          return (
            <span key={singer.id} title={singerName} className="pointer"
              onClick={() => this.handleDetailSinger(singer)}>
              {singerName.charAt(0).toUpperCase() + singerName.slice(1)}
            </span>
          )
        })}
      </div>
    )
  }

  renderSongs(songs) {
    return (
      <div className="result-content">
        {songs.map((song) => {
          return (
            <div className="item-song" key={song.id}>
              <div className="title-song">
                <h3>
                  {song.name}
                  {this.renderSinger(song)}
                </h3>
              </div>
              <div className="info-meta">
                <span>Music type:</span>
                <div className="inline">{this.renderMusicType(song)}</div>
              </div>
              <div className="info-meta"></div>
              <div className="tool-song">
                <Add onClick={(event) => this.handleAddToPlayList(event, song)} className="pointer item-tool" />
                <FileDownload onClick={() => this.handleDownloadSong(song.id)} className="pointer item-tool" />
                <Popover
                  playLists={this.state.playLists}
                  ref="popover"
                  onEventListener={this.handleEventListener}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    let songs = this.state.songs;
    if (!songs) return null;

    return (
      <div className="list-song">
        <div className="result-count">
          {`Have ${songs.length} record`}
        </div>
        {this.renderSongs(songs)}
      </div>
    )
  }
}
