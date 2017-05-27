import ListHeader from "../ListHeader";
import SingerIndex from "../Singers";

export default class index extends SingerIndex {
  constructor(props) {
    super(props);
    this.apiName = "Author";
    this.transPath = "authors";
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      data: data.authors,
    })
  }

  renderHeader() {
    let icon = <i className="material-icons icon-header">account_circle</i>;
    return (
      <ListHeader
        icon={icon}
        title="Authors"
      >
        {this.renderActionHeader()}
      </ListHeader>
    )
  }
}
