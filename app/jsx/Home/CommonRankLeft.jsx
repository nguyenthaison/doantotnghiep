export default class CommonRankLeft extends PageComponent {
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
          <li className="rank-left">{item.get_rank_previous}</li>
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
        <mui.Tab label="Viet Nam" >
          <div>
            {this.renderSongs(listVn)}
          </div>
        </mui.Tab>
        <mui.Tab label="Au My" >
          <div>
            {this.renderSongs(listUs)}
          </div>
        </mui.Tab>
        <mui.Tab label="Han Quoc">
          <div>
            {this.renderSongs(listKp)}
          </div>
        </mui.Tab>
      </mui.Tabs>
    )
  }
}
