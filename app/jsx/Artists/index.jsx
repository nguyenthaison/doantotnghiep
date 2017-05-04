const TAKE = 20;

import FavoriteArtist from "./FavoriteArtist";
import RightContent from "./RightContent";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      singersVn: [],
      singersUs: [],
      singersKp: [],
      authors: [],
      favorite_articles: [],
      rankingSinger: [],
    }
  }

  componentDidMount() {
    this.setToolBar("Artists");
    this.getList();
  }

  getList() {
    API.Singer.getList((status, data) => this.handleGetListSinger(status, data, "singersVn"),
      this.getOption("1"));
    API.Singer.getList((status, data) => this.handleGetListSinger(status, data, "singersVn"),
      this.getOption("2"));
    API.Singer.getList((status, data) => this.handleGetListSinger(status, data, "singersVn"),
      this.getOption("3"));
    API.Singer.getList((status, data) => this.handleGetListSinger(status, data, "rankingSinger"),
      this.getOptionRank());
    API.Author.getList(this.handleGetListAuthor, this.getOption("1"));
    API.FavoriteArticle.getList(this.handleGetData, this.getOptionFA());
  }

  getOptionFA() {
    return {
      filter: {user_id: App.auth.id},
    }
  }

  getOption(countryId) {
    return {
      filter: {country_id: countryId},
      methods: ["total_favorite"],
      take: TAKE,
    }
  }

  getOptionRank() {
    return {
      order_by: "total_favorite desc",
      take: TAKE,
      methods: ["total_favorite"],
    }
  }

  handleGetListSinger = (status, data, singers) => {
    if (!status) return;
    this.setState({
      [singers]: data.singers,
    });
  }

  handleGetListAuthor = (status, data) => {
    if (!status) return;
    this.setState({
      authors: data.authors,
    })
  }

  handleGetData = (status, data) => {
    if (!status) return;
    this.setState({
      favorite_articles: data.favorite_articles,
    })
  }

  handleViewTopic = (title) => {
    Helper.transitionTo(`/artists/${title}`);
  }

  handleClickViewDetail = (artist, articleType) => {
    if (articleType === "Author") {

    } else {
      Helper.transitionTo(`/artists/${artist.name}`, artist);
    }
  }

  handleChangeFavorite = () => {
    this.getList();
  }

  renderLabel(title) {
    return (
      <div className="home-topic">
        <h2><span className="pointer" onClick={() => this.handleViewTopic(title)}>
          {title}<i className="material-icons">keyboard_arrow_right</i>
        </span></h2>
      </div>
    )
  }

  renderArtist(nameList, author=false) {
    let artists = this.state[nameList];
    let image = "/images/p9.jpg";
    const articleType = author ? "author" : "singer";

    return (
      <div className="new-song">
        <div className="list-new-albumcenter">
          {artists.map((artist) => {
            return (
              <div key={artist.id} className="col-lg-2 col-md-2 col-sm-3 col-xs-6">
                <div className="item">
                  <div className="border-image-album-item"
                    onClick={() => this.handleClickViewDetail(artist, articleType)}>
                    <div className="image-album-item">
                      <a>
                        <img src={image} alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="border-title-album-item">
                    <span className="pointer" onClick={() => this.handleClickViewDetail(artist, articleType)}>
                      {artist.name}
                    </span>
                  </div>
                  <FavoriteArtist artist={artist} articleType={articleType}
                    favorite_articles={this.state.favorite_articles}
                    onChange={this.handleChangeFavorite}
                    favorite={artist.total_favorite}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              {this.renderLabel("Viet Nam")}
              {this.renderArtist("singersVn")}

              {this.renderLabel("US UK")}
              {this.renderArtist("singersVn")}

              {this.renderLabel("Kpop")}
              {this.renderArtist("singersVn")}

              {this.renderLabel("Other")}
              {this.renderArtist("authors", true)}
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="home-right">
                <span className="pointer"><h1>HOT ARTIST</h1></span>
                <RightContent
                  singers={this.state.rankingSinger}
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
