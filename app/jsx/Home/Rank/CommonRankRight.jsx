export default class CommonRankRight extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleClickSingerInfo = (singer) => {
    Helper.transitionTo("/singers", singer);
  }

  handleClickViewDetail = () => {

  }

  handleClickPlayOne = (item) => {
    let ckeckAlbum = this.props.album;
    if (ckeckAlbum) {
      Helper.transitionTo(`/albums/${item.id}`, item.id);
      // Helper.transitionTo("/album", item.id);
    } else {
      Helper.transitionTo(`/songs/${item.id}`);
      // Helper.transitionTo("/song", item.id);
    }
  }

  handleActive = (country) => {
    this.props.onActive(country);
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
                <div className="pointer" title={item.name}
                  onClick={() => this.handleClickPlayOne(item)}>
                  {item.name}
                </div>
              </li>
              <li className="name-singer">
                <div className="pointer" title={item.singer}>
                  {item.singers ? this.renderSinger(item.singers) : ""}
                </div>
              </li>
            </ul>
          </li>
          <li className="view">{item.view}</li>
        </ul>
      )}
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
      <mui.Tabs>
        <mui.Tab label="Viet Nam" onActive={() => this.handleActive("vn")}>
          <div>
            {this.renderSongs(listVn)}
          </div>
        </mui.Tab>
        <mui.Tab label="Au My" onActive={() => this.handleActive("us")}>
          <div>
            {this.renderSongs(listUs)}
          </div>
        </mui.Tab>
        <mui.Tab label="Han Quoc" onActive={() => this.handleActive("kp")}>
          <div>
            {this.renderSongs(listKp)}
          </div>
        </mui.Tab>
      </mui.Tabs>
    )
  }
}
