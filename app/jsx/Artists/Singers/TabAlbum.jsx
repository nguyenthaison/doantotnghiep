export default class TabAlbum extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      playlists: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    API.Album.getList(this.handleGetAlbum, this.getOption(nextProps.singer));
  }

  getOption(singer) {
    return {
      filter: {singer: singer.id},
    }
  }

  handleGetAlbum = (status, data) => {
    if (!status) return;
    this.setState({
      playlists: data.play_lists,
    })
  }

  render() {
    return (
      <div className="tab-album"></div>
    )
  }
}
