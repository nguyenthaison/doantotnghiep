import Sound from "react-sound";
import List from "./List";

const TAKE_RECORD = 12;
export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      albumVn: [],
      albumUs: [],
      albumKp: [],
    };
  }

  componentDidMount() {
    this.setToolBar("Album");
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumVn"),
      this.getOption("vn"));
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumUs"),
      this.getOption("vn"));
    API.Album.getList((status, data) => this.handleGetAlbumCallback(status, data, "albumKp"),
      this.getOption("vn"));
  }

  getOption() {
    return {
      take: TAKE_RECORD,
      order_by: "id desc",
    }
  }

  handleGetAlbumCallback = (status, data, albums) => {
    if (!status) return;
    this.setState({
      [albums]: data.albums,
    });
  }

  renderLabel(title) {
    return (
      <div className="home-topic">
        <h2><span className="pointer" onClick={this.handleViewTopic}>
          {title}<i className="material-icons">keyboard_arrow_right</i>
        </span></h2>
      </div>
    )
  }

  render() {
    // console.log(this.state.albumVn);
    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              {this.renderLabel("Viet Nam")}
              <div className="new-song">
                <List list={this.state.albumVn} />
              </div>
              {this.renderLabel("Au My")}
              <div className="new-song">
                <List list={this.state.albumUs} />
              </div>
              {this.renderLabel("Kpop")}
              <div className="new-song">
                <List list={this.state.albumKp} />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="home-left">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
