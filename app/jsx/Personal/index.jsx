import AddBox from "material-ui/svg-icons/content/add-box";
import PlayListForm from "./PlayListForm";

const TAKE_RECORD = 10;

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      play_lists: [],
      show: true,
      hasMore: false,
    }

    this.take = TAKE_RECORD;
  }

  componentDidMount() {
    this.getList(TAKE_RECORD);
  }

  getOption() {
    let include = {
      attachments: {},
    }
    return {
      methods: ["count_song"],
      include: JSON.stringify(include),
    }
  }

  getList() {
    API.PlayList.getList(this.handleGetPlayList, this.getOption());
  }

  handleGetPlayList = (status, data) => {
    if (!data) return;
    this.setState({
      play_lists: data.play_lists,
      hasMore: data["has_more"],
    })
  }

  handleCreatePlayList = () => {
    this.refs.playListForm.open();
  }

  handleSubmit = () => {
    this.take = TAKE_RECORD;
    this.getList(TAKE_RECORD);
  }

  handleClickLoadMore = () => {
    this.take += TAKE_RECORD;
    this.getList(this.take);
  }

  renderPlayLists() {
    let list = this.state.play_lists;
    return (
      <div className="play_lists">
        {list.map((item) => {
          return (
            <div className="item" key={item.id}>
              <div className="e-item">
                <a href="" className=""></a>
                <h3 className="title-item ellipsis">{item.name}</h3>
                <p className="title-sd-item">
                  <span className="txt-info">Create at: {item.created_at}</span>
                  <span className="txt-info">Songs: {item.count_song}</span>
                </p>
                <p className="title-sd-item">
                  <span className="txt-info">Listens: {item.view}</span>
                </p>
              </div>
              <div className="item-tool"></div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="my-page">
        <div className="header">
          <h3 className="title">PLAY LIST</h3>
          <div className="btn-create">
            <cm.RaisedButton
              label="Create Playlist"
              labelPosition="after"
              primary={true}
              icon={<AddBox />}
              onClick={this.handleCreatePlayList} />
          </div>
        </div>
        <div className="content">
          {this.renderPlayLists()}
          {this.state.hasMore ?
            <div className="btn-show-more">
              <cm.RaisedButton
                label={t("common.show_more")}
                onTouchTap={this.handleClickLoadMore}
                backgroundColor="lightgray"
                style={{
                  width: "90%",
                }}
                labelStyle={{
                  fontWeight: "bold",
                }}
              />
            </div> : null}
        </div>

        <PlayListForm ref="playListForm" onSubmit={this.handleSubmit} />
      </div>
    )
  }
}
