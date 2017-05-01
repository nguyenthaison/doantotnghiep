const TAKE_RECORD = 10;

import AddBox from "material-ui/svg-icons/content/add-box";
import Edit from "material-ui/svg-icons/image/edit";
import DeleteForever from "material-ui/svg-icons/action/delete-forever";
import PlayListForm from "./PlayListForm";

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
      attachments: {methods: ["url"]},
      songs: {
        include: {
          singers: {only: ["id", "name"]},
          lyrics: {include: {user: {only: ["id", "name"]}}},
        }
      },
      user: {only: ["id", "name"]},
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

  handlePlayPlayList = (playList) => {
    Helper.transitionTo("/personal/PlayListDetail", playList);
  }

  handleEditPlayList = (playList) => {
    this.refs.playListForm.open(playList);
  }

  handleDeletePlayList = (playList) => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      () => this.handleConfirmDelete(playList));
  }

  handleConfirmDelete = (playList) => {
    API.PlayList.delete(this.handleCallbackDelete, playList.id)
  }

  handleCallbackDelete = (status, data) => {
    if (status) {
      Helper.showMessage(t("common.message.deleted_success"));
      this.getList(TAKE_RECORD);
    } else {
      this.showMessage(data, "error");
    }
  }

  renderPlayLists() {
    const list = this.state.play_lists;
    const defaultImageAlbum = "/images/default-playlist.jpg";

    return (
      <div className="play_lists">
        {list.map((item) => {
          let urlImageAlbum = item.attachments.length > 0 ? item.attachments[0].url : defaultImageAlbum;
          return (
            <div className="item" key={item.id}>
              <div className="avatar">
                <img style={{height: "80px", width: "80px"}} src={urlImageAlbum} />
              </div>
              <div className="e-item">
                <a href="" className=""></a>
                <h3 className="title-item ellipsis">
                  <span onClick={() => this.handlePlayPlayList(item)}>{item.name}</span>
                </h3>
                <p className="title-sd-item">
                  <span className="txt-info">Create at: {item.created_at}</span>
                  <span className="txt-info">Songs: {item.count_song}</span>
                </p>
                <p className="title-sd-item">
                  <span className="txt-info">Listens: {item.view}</span>
                </p>
              </div>
              <div className="item-tool">
                <cm.RaisedButton
                  title={t("common.edit")}
                  labelPosition="after"
                  primary={true}
                  icon={<Edit />}
                  onClick={() => this.handleEditPlayList(item)}
                />

                <cm.RaisedButton
                  title={t("common.delete")}
                  labelPosition="after"
                  primary={true}
                  icon={<DeleteForever />}
                  onClick={() => this.handleDeletePlayList(item)}
                />
              </div>
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
