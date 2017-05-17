import {browserHistory} from 'react-router';

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
    }
  }

  componentDidMount() {
    API.Song.getList(this.handleGetListSong, this.getOption());
  }

  getOption() {
    let query = Helper.getCurrentLocationState();
    return {
      search_query: query.textSearch,
    }
  }

  handleGetListSong = (status, data) => {
    if (!status) return;
    this.setState({
      songs: data.songs,
    })
  }

  render() {
    return (
      <div> </div>
    )
  }
}
