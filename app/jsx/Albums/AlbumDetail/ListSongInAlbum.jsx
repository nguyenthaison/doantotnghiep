import Add from "material-ui/svg-icons/content/add";
import FileDownload from "material-ui/svg-icons/file/file-download";
import OpenInNew from "material-ui/svg-icons/action/open-in-new";
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Checkbox from 'material-ui/Checkbox';
import CreatePlayList from "./CreatePlayList";

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

export default class ListSongInAlbum extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      playLists: [],
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    API.PlayList.getList(this.handleGetListPlayList, this.getOption());
  }

  getOption() {
    let include = {
      play_list_songs: {},
    }

    return {
      filter: {user_id: App.auth.id},
      include: JSON.stringify(include),
      order_by: "id asc"
    }
  }

  handleGetListPlayList = (status, data) => {
    if (!status) return;
    this.setState({
      playLists: data.play_lists,
    })
  }

  handleChangeSongActive = (song) => {
    this.props.onChangeSongActive(song);
  }

  handleAddToPlayList = (event) => {

    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleDownloadSong = (id) => {
    window.open(`/api/v1/download/${id}`, "_self");
  }

  handlePlayOneSong = (id) => {
    Helper.transitionTo("/song", id);
  }

  handleDetailSinger = (singer) => {
    Helper.transitionTo("/singers", singer);
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleCheckFavorite = (song, playList, index) => {
    if (index === -1) {
      let play_list_song = {};
      play_list_song["play_list_id"] = playList.id;
      play_list_song["song_id"] = song.id;
      API.PlayListSong.create(this.handleAddSongToPlayList, play_list_song);
    } else {

      API.PlayListSong.delete(this.handleDeleteFavorite, playList.play_list_songs[index].id);
    }
  }

  handleAddSongToPlayList = (status, data) => {
    if (!status) return;
    this.getList();
  }

  handleDeleteFavorite = (status, data) => {
    if (!status) return;
    this.getList();
  }

  handleCreatePlayList = () => {
    this.getList();
  }

  renderSongAnimation() {
    return (
      <div className="playing">
        <svg xmlns="http://www.w3.org/2000/svg" className="equilizer" viewBox="0 0 128 128">
          <g>
            <title>Audio Equilizer</title>
            <rect className="bar" transform="translate(0,0)" y="15"></rect>
            <rect className="bar" transform="translate(25,0)" y="15"></rect>
            <rect className="bar" transform="translate(50,0)" y="15"></rect>
            <rect className="bar" transform="translate(75,0)" y="15"></rect>
            <rect className="bar" transform="translate(100,0)" y="15"></rect>
          </g>
        </svg>
      </div>
    )
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

  renderTool(item) {
    const playLists = this.state.playLists;
    return (
      <div className="tool">
        <Add onClick={this.handleAddToPlayList} className="pointer item-tool" />
        <FileDownload onClick={() => this.handleDownloadSong(item.id)} className="pointer item-tool" />
        <OpenInNew onClick={() => this.handlePlayOneSong(item.id)} className="pointer item-tool"  />
        {this.renderPlayList(item)}
      </div>
    )
  }

  renderPlayList(song) {
    const playLists = this.state.playLists;

    return (
      <mui.Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        {playLists.map((item) => {
          let index = item.play_list_songs.findIndex((play_list_song) => song.id === play_list_song.song_id)

          return (
            <mui.Checkbox
              key={item.id}
              checkedIcon={item.play_list_type === "Favorite" ? <ActionFavorite /> : null}
              uncheckedIcon={item.play_list_type === "Favorite" ? <ActionFavoriteBorder /> : null}
              label={item.name}
              checked={index === -1 ? false : true}
              style={styles.checkbox}
              onCheck={() => this.handleCheckFavorite(song, item, index)}
            />
          )
        })}
        <CreatePlayList onCreate={this.handleCreatePlayList} />
      </mui.Popover>
    )
  }

  render() {
    let list = this.props.list;
    let songActive = this.props.songActive;

    if (!list) return null;

    return (
      <div className="list-music">
        {list.map((item, index) => {
          return (
            <ul key={item.id}>
              <li>
                {item.id === songActive.id ? this.renderSongAnimation() : index + 1}
              </li>
              <li><span className="pointer" title={item.name} onClick={() => this.handleChangeSongActive(item)}>
                {item.name}</span>
              </li>
              <li>{this.renderSinger(item)}</li>
              <li>{this.renderTool(item)}</li>
            </ul>
          )
        })}
      </div>
    )
  }
}
