import SongForm from "./SongForm";
import SongDetail from "./SongDetail";
import MasterIndex from "../../MasterIndex";
import ListHeader from "../../ListHeader";

export default class index extends MasterIndex {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }

    this.headerType = "secondary";
    this.noHeaderTitle = true;

    this.apiName = "Song";
    this.tableName = "songs";
    this.transPath = "albums.songs";
    this.fields = [
      {name: "name", width: 6},
    ];
    this.objectDetail = SongDetail;
    this.objectForm = SongForm;
  }

  isAuthorized() {
    return true;
  }

  componentDidMount() {
  }

  getOptions() {
    return {
      filter: {
        album: this.parent ? this.parent.id : null,
      },
      include: JSON.stringify({
        singers: {},
        lyrics: {} ,
        attachments: {},
        album_songs: {},
      })
    }
  }

  open = (data, additionData) => {
    this.parent = data || {};
    this.additionData = additionData;
    this.typingQuery = "";

    if (data.id) {
      this.setState({
        show: true,
      });
      this.getListMaster(this.take);
    }
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      data: data.songs,
    })
  }

  close = () => {
    this.setState({
      show: false,
      list: null,
    });
  }

  handleClose = () => {
    this.close();
  }

  renderHeader() {
    let icon = <i className="material-icons icon-header">audiotrack</i>;
    return (
      <ListHeader
        icon={icon}
        title="Songs"
      >
        {this.renderActionHeader()}
      </ListHeader>
    )
  }

  renderDataRow(item, index) {
    let dataRow = this.fields.map((field) => {
      let text = field.transform ? field.transform(item) : item[field.name];
      return (
        <div className={`col-xs-${field.width} td ellipsis-text custom-${field.name}`} key={field.name}
          title={text}>
          <span>{text}</span>
        </div>
      );
    });

    const defaultImg = "/images/default-playlist.jpg";
    let avatar = "";
    if (this.parent && this.parent.attachments[0]) {
      avatar = this.parent.attachments[0].url
    } else {
      avatar = defaultImg;
    }

    return (
      <div>
        <div className="col-xs-1 td ellipsis-text"
          title={item.id}>
          <span>{index + 1}</span>
        </div>
        <div className="col-xs-1 td">
          <mui.Avatar src={avatar} size={40} className="avatar"/>
        </div>
        {dataRow}
        <div className="col-xs-2 td"
          title={item.created_at}>
          <span>{item.created_at}</span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <cm.Dialog
          title={this.parent ? this.parent.name : ""}
          className="base-master-dialog-index"
          contentClassName="dialog-content"
          onRequestClose={this.handleClose}
          open={this.state.show}
        >
            {super.render()}
        </cm.Dialog>
      </div>
    );
  }
}
