import ListHeader from "../ListHeader";
import AlbumDetail from "./AlbumDetail";
import AlbumForm from "./AlbumForm";
import MasterIndex from "../MasterIndex";
import Songs from "./Songs";

export default class index extends MasterIndex {
  constructor(props) {
    super(props);
    this.objectDetail = AlbumDetail;
    this.objectForm = AlbumForm;
    this.apiName = "Album";
    this.transPath = "albums";

    this.fields = [
      {name: "name", width: 1},
      {name: "singer", width: 2, transform: (item) => {
        let singers = "";
        if (item.singers.length === 0 || item.singers.length > 2) return "Many Singers";
        if (item.singers.length > 0) {
          for (let _item of item.singers) {
            let childItemFormat = " " + _item.name + ",";
            singers += childItemFormat;
          };
          return singers = singers.replace(/.$/," ");
        }
      }},
      {name: "country", width: 1, transform: (item) => {return item.country.full_name}},
      {name: "view", width: 1},
    ];

    this.child = {
      dialog: Songs,
    }
  }

  getOptions() {
    let include = {
      country: {},
      attachments: {},
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
