export default class ListSongInAlbum extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleChangeSongActive = (song) => {
    this.props.onChangeSongActive(song);
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

  renderSinger() {
    return (
      <div></div>
    )
  }

  renderTool() {
    return (
      <div></div>
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
              <li>{this.renderSinger}</li>
              <li>{this.renderTool}</li>
            </ul>
          )
        })}
      </div>
    )
  }
}
