import ListHeader from "../ListHeader";
import AlbumDetail from "./AlbumDetail";
import AlbumForm from "./AlbumForm";
import MasterIndex from "../MasterIndex";

export default class index extends MasterIndex {
  constructor(props) {
    super(props);
    this.objectDetail = AlbumDetail;
    this.objectForm = AlbumForm;
    this.apiName = "Album";
  }

  getOptions() {
    let include = {
      country: {},
      attachments: {},
      // background_attachments: {},
      singers: {},
    }
    return {
      include: JSON.stringify(include),
    }
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      data: data.albums,
    })
  }

  renderHeader() {
    let icon = <i className="material-icons icon-header">album</i>;
    return (
      <ListHeader
        icon={icon}
        title="Albums"
      >
        {this.renderActionHeader()}
      </ListHeader>
    )
  }
}
