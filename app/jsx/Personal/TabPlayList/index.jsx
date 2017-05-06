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
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div className="item-sub">
                  <div className="wrapp">
                    <div className="avatar">
                      <img src={urlImageAlbum} />
                      <div className="avatar-background"></div>
                    </div>
                  </div>
                  <div className="e-item">
                    <h4 className="title-item ellipsis">
                      <span onClick={() => this.handlePlayPlayList(item)}>{item.name}</span>
                    </h4>
                    <p className="title-sd-item">
                      <span className="txt-info"><span>Create at:</span> {item.created_at}</span>
                      <span className="txt-info"><span>Songs:</span> {item.count_song}</span>
                    </p>
                    <p className="title-sd-item">
                      <span className="txt-info">Listens: {item.view}</span>
                    </p>
                  </div>
                  <div className="item-tool">
                    <div className="item-tool-sub">
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
                </div>
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
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="header">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h3 className="title">PLAY LIST</h3>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="btn-create">
                    <cm.RaisedButton
                      label="Create Playlist"
                      labelPosition="after"
                      primary={true}
                      icon={<AddBox />}
                      onClick={this.handleCreatePlayList} />
                </div>
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
        </div>
      </div>
    )
  }
}
