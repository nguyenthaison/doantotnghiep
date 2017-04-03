import Song from "./Song";
import TmpSongs from "./TmpSongs";
import PlayCircleOutline from "material-ui/svg-icons/av/play-circle-outline";

export default class Index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.setToolBar("Song");
    API.Song.getList(this.handleGetListCallback);
  }

  handleGetListCallback = (status, data) => {
    if (!status) return;
    this.setState({
      list: TmpSongs,
    });
  }

  handleClickPlayAll = () => {
    let list = this.state.list;
    let name = list[0].title;
    Helper.transitionTo("/song", list);
  }

  handleClickPlayOne = (item) => {
    Helper.transitionTo("/song", item);
  }

  render() {
    let list = this.state.list;
    return (
      <div className="base-master-index row">
        <div className="col-xs-9">
          <div className="list-song">
            <div className="row">
                <div className="col-xs-4 td">
                  <p>Bang xep hang</p>
                </div>
                <div className="col-xs-4 td">
                </div>
                <div className="col-xs-4 td">
                  <cm.RaisedButton
                    icon={<PlayCircleOutline />}
                    className="button-volume"
                    primary={true}
                    label="Play all"
                    onClick={this.handleClickPlayAll}/>
                </div>
              </div>
            {list.map((item, index) => {
              return(
                <div key={index}>
                  <div className="row table-row table-row-striped-2 pointer"
                    onClick={() => this.handleClickPlayOne(item)}>
                    <div className="col-xs-4 td">
                      {index}
                    </div>
                    <div className="col-xs-4 td">
                      {item.title}
                    </div>
                    <div className="col-xs-4 td">
                      {item.duration}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    )
  }
}
