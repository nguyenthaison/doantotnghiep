import Add from "material-ui/svg-icons/content/add";
import Clear from "material-ui/svg-icons/content/clear";
import FileDownload from "material-ui/svg-icons/file/file-download";
import PlayCircleFilled from "material-ui/svg-icons/av/play-circle-filled";
import Popover from "../../Albums/AlbumDetail/Popover";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      playLists: [],
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    API.PlayList.getList(this.handleGetList, this.getOption());
  }

  getOption() {
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

  handlePlayAll = (playList) => {
    Helper.transitionTo("/personal/PlayListDetail", playList);
  }

  handlePlayOneSong = (id) => {
    Helper.transitionTo("/song", id);
  }

  handleDetailSinger = (singer) => {
    Helper.transitionTo("/singers", singer);
  }

  handleDownloadSong = (id) => {
    window.open(`/api/v1/download/${id}`, "_self");
  }

  handleDeleteSong = (song) => {
    let playListSongId = song.play_list_songs[0].id;
    API.PlayListSong.delete(this.handleDeleteSongFromPlayList, playListSongId)
  }

  handleDeleteSongFromPlayList = (status, data) => {
    if (!status) return;
    this.getList();
  }

  handleAddToPlayList = (event, song) => {
    this.refs.popover.open({currentTarget: event.currentTarget, song: song});
    event.preventDefault();
  }

  handleEventListener = () => {
    this.getList();
  }

  renderListSongs(songs) {
    return (
      <div className="list-song">
        {songs.map((song) =>
          {return (
            <ul key={song.id}>
              <li><span className="pointer" title={song.name} onClick={() => this.handlePlayOneSong(song.id)}>
                {song.name}</span>
              </li>
              <li>{this.renderSinger(song)}</li>
              <li>{this.renderTool(song)}</li>
            </ul>
          )}
        )}
      </div>
    )
  }

  renderSinger(song) {
    let singers = song.singers;

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

  renderTool(song) {
    return (
      <div className="tool">
        <Add onClick={(event) => this.handleAddToPlayList(event, song)} className="pointer item-tool" />
        <FileDownload onClick={() => this.handleDownloadSong(song.id)} className="pointer item-tool" />
        <Clear onClick={() => this.handleDeleteSong(song)} className="pointer item-tool"  />
        <Popover
          playLists={this.state.playLists}
          ref="popover"
          onEventListener={this.handleEventListener}
        />
      </div>
    )
  }

  render() {
    let playList = this.state.playLists[0];
    let songs = playList ? playList.songs : [];

    return (
      <div className="favorite-music">
        <cm.RaisedButton
          label="PLAY ALL"
          labelPosition="after"
          className="pointer"
          primary={true}
          onClick={() => this.handlePlayAll(playList)}
          icon={<PlayCircleFilled />} />
        {this.renderListSongs(songs)}
      </div>
    )
  }
}
