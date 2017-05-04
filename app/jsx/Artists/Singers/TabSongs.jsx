import Popover from "../../Albums/AlbumDetail/Popover";
import Add from "material-ui/svg-icons/content/add";
import FileDownload from "material-ui/svg-icons/file/file-download";
import PlayCircleFilled from "material-ui/svg-icons/av/play-circle-filled";

export default class TabSongs extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      playLists: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    API.Song.getList(this.handleGetSong, this.getOptionSong(nextProps.singer));
    API.PlayList.getList(this.handleGetList, this.getOptionPlaylist());
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getOptionSong(singer) {
    return {
      filter: {singer: singer.id},
    }
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

  handleGetSong = (status, data) => {
    if (!status) return;
    this.setState({
      songs: data.songs,
    })
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      playLists: data.play_lists,
    })
  }

  handlePlayOneSong = (id) => {
    Helper.transitionTo("/song", id);
  }

  handleAddToPlayList = (event, song) => {
    if (this._isMounted) {
      this.refs.popover.open({currentTarget: event.currentTarget, song: song});
    }
    event.preventDefault();
  }

  handleDownloadSong = (id) => {
    window.open(`/api/v1/download/${id}`, "_self");
  }

  handleEventListener = () => {
    API.PlayList.getList(this.handleGetList, this.getOptionPlaylist());
  }

  renderListSongs(songs) {
    return (
      <div className="list-song">
        {songs.map((song) =>
          {return (
            <ul key={song.id}>
              <li>
                <span className="pointer" title={song.name} onClick={() => this.handlePlayOneSong(song.id)}>
                  {song.name}
                </span>
              </li>
              <li><i className="material-icons">hearing</i><p title={song.view}>{song.view}</p></li>
              <li><i className="material-icons">file_download</i><p title={song.download}>{song.download}</p></li>
              <li>{this.renderTool(song)}</li>
            </ul>
          )}
        )}
      </div>
    )
  }

  renderTool(song) {
    return (
      <div className="tool">
        <Add onClick={(event) => this.handleAddToPlayList(event, song)} className="pointer item-tool" />
        <FileDownload onClick={() => this.handleDownloadSong(song.id)} className="pointer item-tool" />
        <Popover
          playLists={this.state.playLists}
          ref="popover"
          onEventListener={this.handleEventListener}
        />
      </div>
    )
  }

  render() {
    const songs = this.state.songs;

    return (
      <div className="tab-songs">
        {/*<cm.RaisedButton
          label="PLAY ALL"
          labelPosition="after"
          className="pointer"
          primary={true}
          onClick={() => this.handlePlayAll(playList)}
          icon={<PlayCircleFilled />} />*/}
        {this.renderListSongs(songs)}
      </div>
    )
  }
}
