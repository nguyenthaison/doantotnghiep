const TAKE_RECORD = 10;
import TmpSongs from "../../Songs/TmpSongs";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listTopVn: [],
      listTopUs: [],
      listTopKp: [],
    };
  }

  componentDidMount() {
    API.Rank.getList(this.handleGetListVnCallback, this.getOption("vn"));
    API.Rank.getList(this.handleGetListUsCallback, this.getOption("us"));
    API.Rank.getList(this.handleGetListKpCallback, this.getOption("kp"));
  }

  getOption(type) {
    let include = {
      song_ranks: {include: {song: { include: {singer_songs: {include: {singer: {}}}}}}},
    };
    return {
      include: JSON.stringify(include),
      filter: {rank_type: type},
      take: TAKE_RECORD,
    }
  }

  handleGetListVnCallback = (status, data) => {
    if (!status) return;
    this.setState({
      listTopVn: TmpSongs,
    });
  }

  handleGetListUsCallback = (status, data) => {
    this.setState({
      listTopUs: TmpSongs,
    });
  }

  handleGetListKpCallback = (status, data) => {
    this.setState({
      listTopKp: TmpSongs,
    });
  }

  handleClickPlay = (list) => {
    Helper.transitionTo("/song", list);
  }

  handleClickSingerInfo = (singer) => {
    Helper.transitionTo("/singers", singer);
  }

  renderSongs(list) {
    return list.map((item, index) => {
      return (
        <div className="song-item" key={index}>
          <div className="rank-song">
            <h3>{item.id}</h3>
          </div>
          <div className="content">
            <div className="name-song">
              <span className="pointer" onClick={() => this.handleClickPlay(item)}>
                {item.title}
              </span>
            </div>
            <div className="singer-song" className="pointer"
              onClick={() => this.handleClickSingerInfo(item.singer)}>
              <span className="pointer">{item.singer}</span>
            </div>
          </div>
        </div>
      )}
    )
  }

  render() {
    let listTopVn = this.state.listTopVn;
    let listTopUs = this.state.listTopUs;

    return (
      <div className="child-tab">
        <div className="mg-pd">
          <div className="main1">
            <div className="main1-top row">
              <div className="col-md-9">Top music viet nam</div>
              <div className="col-md-3">
                <i className="material-icons pointer" onClick={() => this.handleClickPlay(listTopVn)}>
                  play_circle_outline
                </i>
              </div>
            </div>
            <div className="main1-body">
              <div style={{marginTop: "8px"}}></div>
              {this.renderSongs(listTopVn)}
            </div>
          </div>

          <div className="main2">
            <div className="main1-top row">
              <div className="col-md-9">Top music chau au</div>
              <div className="col-md-3">
                <i className="material-icons pointer" onClick={() => this.handleClick(listTopUs)}>
                  play_circle_outline
                </i>
              </div>
            </div>
            <div className="main1-body">
              <div style={{marginTop: "8px"}}></div>
              {this.renderSongs(listTopUs)}
            </div>
          </div>

          <div className="main3">
            <div className="main1-top row">
              <div className="col-md-9">Top music Kpop</div>
              <div className="col-md-3">
                <i className="material-icons pointer" onClick={() => this.handleClick(listTopKp)}>
                  play_circle_outline
                </i>
              </div>
            </div>
            <div className="main1-body">
              <div style={{marginTop: "8px"}}></div>
              {this.renderSongs(listTopUs)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
