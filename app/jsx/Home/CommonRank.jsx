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
        <ul key={index} className="sub-main1-top">
          <li className="rank-left">{index + 1}</li>
          <li className="rank-right">
            <ul>
              <li className="ellipsis">
                <span className="pointer" title={item.title} onClick={() => this.handleClickPlay(item)}>
                  {item.title}
                </span>
              </li>
              <li className="ellipsis">
                <span className="pointer" title={item.singer} onClick={() => this.handleClickSingerInfo(item.singer)}>
                  {item.singer}
                </span>
              </li>
            </ul>
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
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div className="row">
            <div className="main1">
              <div className="main1-top">
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                  <div className="row">
                    <span onClick={this.handleClickViewDetail} className="pointer title-top">
                      Top music viet nam
                    </span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <i className="material-icons pointer" onClick={() => this.handleClickPlay(listVn)}>
                    play_circle_outline
                  </i>
                </div>
              </div>
              <div className="main1-body">
                {this.renderSongs(listVn)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div className="row">
            <div className="main2">
              <div className="main1-top">
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                  <div className="row">
                    <span onClick={this.handleClickViewDetail} className="pointer title-top">
                      Top music chau au
                    </span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <i className="material-icons pointer" onClick={() => this.handleClickPlay(listUs)}>
                    play_circle_outline
                  </i>
                </div>
              </div>
              <div className="main1-body">
                {this.renderSongs(listUs)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div className="row">
            <div className="main3">
              <div className="main1-top">
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                  <div className="row">
                    <span onClick={this.handleClickViewDetail} className="pointer title-top">
                      Top music Kpop
                    </span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <i className="material-icons pointer" onClick={() => this.handleClickPlay(listKp)}>
                    play_circle_outline
                  </i>
                </div>
              </div>
              <div className="main1-body">
                {this.renderSongs(listKp)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
