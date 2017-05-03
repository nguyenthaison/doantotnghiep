import Add from "material-ui/svg-icons/content/add";
import FileDownload from "material-ui/svg-icons/file/file-download";
import OpenInNew from "material-ui/svg-icons/action/open-in-new";
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Checkbox from 'material-ui/Checkbox';

import Popover from "./Popover";

export default class ListSongInAlbum extends PageComponent {
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

  handleAddToPlayList = (event, song) => {
    this.refs.popover.open({currentTarget: event.currentTarget, song: song});
    event.preventDefault();
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

  handleEventListener = () => {
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

  renderTool(song) {
    const playLists = this.state.playLists;
    return (
      <div className="tool">
        <Add onClick={(event) => this.handleAddToPlayList(event, song)} className="pointer item-tool" />
        <FileDownload onClick={() => this.handleDownloadSong(song.id)} className="pointer item-tool" />
        <OpenInNew onClick={() => this.handlePlayOneSong(song.id)} className="pointer item-tool"  />
        <Popover
          playLists={this.state.playLists}
          ref="popover"
          onEventListener={this.handleEventListener}
        />
      </div>
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
