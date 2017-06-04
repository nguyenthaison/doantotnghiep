export default class Album extends PageComponent {
  constructor(props) {
    super(props);
  }

  handlePlayAlbum = (album) => {
    Helper.transitionTo(`/albums/${album.id}`);
    // Helper.transitionTo("/album", album.id);
  }

  handleViewSinger = (singers) => {
    Helper.transitionTo("/singers", singers[0]);
  }

  render() {
    const albums = this.props.list;
    const singer = this.props.singer;
    if (!albums) return null;
    const name = singer ? singer.name : null;

    return (
      <div className="albums">
        <span className="title"><h1>{"Album " + name}</h1></span>
        <div className="album-list">
          {albums.map((album) => {
            let singerName = album.singers.length > 1 ? "Many artists" : name;

            return (
              <div key={album.id}>
                <div className="img-album pointer" onClick={() => this.handlePlayAlbum(album)}>
                  <img src="/images/logo.jpg" style={{height: "200px", width: "200px"}} />
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
}
