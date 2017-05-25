import {browserHistory} from 'react-router';
import ListSearchSong from "./ListSearchSong";
import PlaylistSearch from "./PlaylistSearch";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: "songs",
    }
  }

  componentDidMount() {
    this.setToolBar("Music Search");
  }

  handleActive = (value) => {
    this.setState({
      active: value,
    });
  }

  render() {
    const query = Helper.getCurrentLocationState();

    return (
      <div className="list-search">
        <mui.Tabs>
          <mui.Tab label="Songs" onActive={() => this.handleActive("songs")}>
            <ListSearchSong query={query} active={this.state.active}/>
          </mui.Tab>
          <mui.Tab label="Playlist" onActive={() => this.handleActive("playlist")}>
            <PlaylistSearch query={query} active={this.state.active}/>
          </mui.Tab>
        </mui.Tabs>
      </div>
    )
  }
}
