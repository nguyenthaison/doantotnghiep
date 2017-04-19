import AddBox from "material-ui/svg-icons/content/add-box";
import PlayListForm from "./PlayListForm";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      play_lists: [],
      show: true,
    }
  }

  componentDidMount() {
    API.PlayList.getList(this.handleGetPlayList, this.getOption());
  }

  getOption() {
    return {
      methods: ["count_song"],
    }
  }

  handleGetPlayList = (status, data) => {
    if (!data) return;
    this.setState({
      play_lists: data.play_lists,
    })
  }

  handleCreatePlayList = () => {
    this.refs.playListForm.open();
  }

  render() {
    return (
      <div className="my-page">
        <div className="header">
          <h3 className="title">PLAY LIST</h3>
          <div className="btn-create">
            <cm.RaisedButton
              label="create-play-list"
              labelPosition="after"
              primary={true}
              icon={<AddBox />}
              onClick={this.handleCreatePlayList} />
          </div>
        </div>
        <PlayListForm ref="playListForm" />
      </div>
    )
  }
}
