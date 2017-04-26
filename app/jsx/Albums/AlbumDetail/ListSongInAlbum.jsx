import Add from "material-ui/svg-icons/content/add";
import FileDownload from "material-ui/svg-icons/file/file-download";
import OpenInNew from "material-ui/svg-icons/action/open-in-new";

export default class ListSongInAlbum extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleChangeSongActive = (song) => {
    this.props.onChangeSongActive(song);
  }

  handleAddToPlayList = () => {
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
    return (
      <div className="tool">
        <Add onClick={this.handleAddToPlayList} className="pointer item-tool" />
        <FileDownload onClick={() => this.handleDownloadSong(item.id)} className="pointer item-tool" />
        <OpenInNew onClick={() => this.handlePlayOneSong(item.id)} className="pointer item-tool"  />
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
