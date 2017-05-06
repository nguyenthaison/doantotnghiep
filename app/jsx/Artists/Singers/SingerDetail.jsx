const TAKE = 10;

import RightContent from "../RightContent";
import TabOverview from "./TabOverview";
import TabSongs from "./TabSongs";
import TabAlbum from "./TabAlbum";

export default class SingerDetail extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      favorite_articles: [],
      singer: {},
      singers: [],
      openTabOverview: true,
      openAlbum: false,
      openSong: false,
    }
  }

  componentDidMount() {
    this.setToolBar("Singer Detail");
    let state = Helper.getCurrentLocationState();
    API.Singer.get(this.handleGetSingerInfo, state.id);
    this.getList();
  }

  getList() {
    API.FavoriteArticle.getList(this.handleGetFA, this.getOptionFA());
    API.Singer.getList(this.handleGetListSinger, this.getOption());
  }

  getOption() {
    return {
      take: TAKE,
    }
  }

  getOptionFA() {
    return {
      filter: {user_id: App.auth.id},
    }
  }

  handleGetSingerInfo = (status, data) => {
    if (!status) return;
    this.setState({
      singer: data.singer,
    })
  }

  handleGetFA = (status, data) => {
    if (!status) return;
    this.setState({
      favorite_articles: data.favorite_articles,
    })
  }

  handleGetListSinger = (status, data) => {
    if (!status) return;
    this.setState({
      singers: data.singers,
    })
  }

  handleChangeFavorite = () => {
    this.getList();
  }

  handleActive = (key) => {

  }

  render() {
    let imageBg = "/images/download.jpg";
    let imageAvatar = "/images/p9.jpg";
    let singer = this.state.singer;

    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              <div className="header">
                <img src={imageBg} />
                <div className="avatar">
                  <mui.Avatar src={imageAvatar} size={80} />
                  <div className="text-content">
                    <p>{singer.name}</p>
                    <p>{singer.total_favorites}</p>
                  </div>
                </div>
              </div>
              <div className="body">
                <mui.Tabs className="parent-tab">
                  <mui.Tab label="Overview" onActive={() => this.handleActive("overview")}>
                    <TabOverview singer={singer} />
                  </mui.Tab>
                  <mui.Tab label="Songs" onActive={() => this.handleActive("songs")}>
                    <TabSongs singer={singer} />
                  </mui.Tab>
                  <mui.Tab label="Album" onActive={() => this.handleActive("playlist")}>
                    <TabAlbum singer={singer} />
                  </mui.Tab>
                </mui.Tabs>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="home-right">
                <span className="pointer"><h1>OTHER ARTIST</h1></span>
                <RightContent
                  singers={this.state.singers}
                  favorite_articles={this.state.favorite_articles}
                  onChange={this.handleChangeFavorite}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
