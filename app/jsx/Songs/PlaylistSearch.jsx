export default class PlaylistSearch extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === "playlist") {
      API.PlayList.getList(this.handleGetListPlaylist, this.getOption(nextProps.query))
    }
  }

  getOption(query) {
    let include = {
      user: {only: ["id", "name"]},
      music_types: {only: ["name"]},
    }
    return {
      search_query: query.textSearch,
    }
  }

  handleGetListPlaylist = (status, data) => {
    if (!status) return;
    this.setState({
      playlist: data.play_lists,
    });
  }

  render() {
    let playlist = this.state.playlist;
    if (!playlist) return null;

    return (
      <div className="playlist-search">
        <div className="result-count">
          {`Have ${playlist.length} record`}
        </div>
        <div className="result-content">
        </div>
      </div>
    )
  }
}
