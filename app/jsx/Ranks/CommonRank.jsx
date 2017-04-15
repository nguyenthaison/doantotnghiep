export default class CommonRank extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleClickSingerInfo = (singer) => {
    Helper.transitionTo("/singers", singer);
  }

  handleClickViewDetail = () => {

  }

  handleClickPlay = (item) => {
    if (item.link) {
      Helper.transitionTo("/song", item.id);
    } else {
      Helper.transitionTo("/album", item.id);
    }
  }

  handleClickPlayAll = (country) => {
    switch(country) {
    case "kp":
      Helper.transitionTo("/album", this.props.albumKp.id)
      break;
    case "us":
      Helper.transitionTo("/album", this.props.albumUs.id)
      break;
    default:
      Helper.transitionTo("/album", this.props.albumVn.id)
    }
  }

  renderSinger(singers) {
    return singers.map((singer, index) => {
      return (
        <span key={index} onClick={() => this.handleClickSingerInfo(singer)}>
          {singer.name + " "}
        </span>
      )
    })
  }

  renderSongs(list) {
    return list.map((item, index) => {
      return (
        <ul key={index} className="sub-main1-top">
          <li className="rank-left">{index + 1}</li>
          <li className="rank-right">
            <ul>
              <li className="ellipsis">
                <span className="pointer" title={item.name}
                  onClick={() => this.handleClickPlay(item)}>
                  {item.name}
                </span>
              </li>
              <li className="ellipsis">
                <p className="pointer" title={item.singer}>
                  {item.singers ? this.renderSinger(item.singers) : ""}
                </p>
              </li>
            </ul>
          </li>
        </ul>
      )}
    )
  }

  renderChildrenMain(title, list, country) {
    let checkAlbum = this.props.album;

    return (
      <div>
        <div className="main1-top">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="row">
              <span onClick={this.handleClickViewDetail} className="pointer title-top">
                {title}
              </span>
            </div>
          </div>
          {checkAlbum ? null : <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <i className="material-icons pointer" onClick={() => this.handleClickPlayAll(list, country)}>
              play_circle_outline
            </i>
          </div>}
        </div>
        <div className="main1-body">
          {this.renderSongs(list)}
        </div>
      </div>
    )
  }

  render() {
    let listVn = this.props.listVn;
    let listUs = this.props.listUs;
    let listKp = this.props.listKp;
    let titleVn = this.props.titleVn;
    let titleUs = this.props.titleUs;
    let titleKp = this.props.titleKp;

    return (
      <div className="child-tab">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div className="row">
            <div className="main1">
              {this.renderChildrenMain(titleVn, listVn, "vn")}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div className="row">
            <div className="main2">
              {this.renderChildrenMain(titleUs, listUs, "us")}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div className="row">
            <div className="main3">
              {this.renderChildrenMain(titleUs, listKp, "kp")}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
