export default class CommonRank extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleClickSingerInfo = (singer) => {
    Helper.transitionTo("/singers", singer);
  }

  handleClickViewDetail = () => {

  }

  handleClickPlay = (list) => {
    Helper.transitionTo("/song", list);
  }

  renderSongs(list) {
    return list.map((item, index) => {
      return (
        <ul key={index}>
          <li>
            <div className="rank">{index + 1}</div>
            <div className="song-name ellipsis pointer">
              <span className="pointer" onClick={() => this.handleClickPlay(item)}>{item.title}</span>
            </div>
            <div className="inblock ellipsis">
              <div className="singer-song">
                <span className="pointer" onClick={() => this.handleClickSingerInfo(item.singer)}>
                  {item.singer}
                </span>
              </div>
            </div>
          </li>
        </ul>
      )}
    )
  }

  render() {
    let listVn = this.props.listVn;
    let listUs = this.props.listUs;
    let listKp = this.props.listKp;

    return (
      <div className="child-tab">
        <div className="mg-pd">
          <div className="main1">
            <div className="main1-top row">
              <div className="col-md-9">
                <span onClick={this.handleClickViewDetail} className="pointer">
                  Top music viet nam
                </span>
              </div>
              <div className="col-md-3">
                <i className="material-icons pointer" onClick={() => this.handleClickPlay(listVn)}>
                  play_circle_outline
                </i>
              </div>
            </div>
            <div className="main1-body">
              <div style={{marginTop: "8px"}}></div>
              {this.renderSongs(listVn)}
            </div>
          </div>

          <div className="main2">
            <div className="main1-top row">
              <div className="col-md-9">
                <span onClick={this.handleClickViewDetail} className="pointer">
                  Top music chau au
                </span>
              </div>
              <div className="col-md-3">
                <i className="material-icons pointer" onClick={() => this.handleClickPlay(listUs)}>
                  play_circle_outline
                </i>
              </div>
            </div>
            <div className="main1-body">
              <div style={{marginTop: "8px"}}></div>
              {this.renderSongs(listUs)}
            </div>
          </div>

          <div className="main3">
            <div className="main1-top row">
              <div className="col-md-9">
                <span onClick={this.handleClickViewDetail} className="pointer">
                  Top music Kpop
                </span>
              </div>
              <div className="col-md-3">
                <i className="material-icons pointer" onClick={() => this.handleClickPlay(listKp)}>
                  play_circle_outline
                </i>
              </div>
            </div>
            <div className="main1-body">
              <div style={{marginTop: "8px"}}></div>
              {this.renderSongs(listKp)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
