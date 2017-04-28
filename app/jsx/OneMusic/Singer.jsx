import Add from "material-ui/svg-icons/content/add";
import Done from "material-ui/svg-icons/action/done";

export default class Singer extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      favorite_articles: [],
    }
  }

  ComponentDidMount() {
    API.FavoriteArticle.getList((status, data) => this.handleGetData(status, data, "favorite_articles"));
  }

  handleGetData = (status, data) => {
    if (!status) return;
    this.setState({
      favorite_articles: data.favorite_articles,
    })
  }

  handleCareSinger = (event, singer, favorite) => {
    if (favorite) {
      Helper.showConfirm(
        "", "Are you sure?",
        () => this.handleConfirmDelete(favorite));

      event.stopPropagation();
    } else {
      let favorite_article = {};
      favorite_article["article_type"] = "singer";
      favorite_article["article_id"] = singer.id;
      API.FavoriteArticle.create(this.handleFavoriteSinger, favorite_article)
    }
  }

  handleConfirmDelete = (favorite) => {
    API.FavoriteArticle.delete((status, data) => this.handleFavoriteSinger(status, data, favorite),
      favorite.id)
  }

  handleFavoriteSinger = (status, data, favorite) => {
    if (status) {
      if (favorite) {
        Helper.showMessage("Oke! You don't care");
      }
      API.FavoriteArticle.getList((status, data) => this.handleGetData(status, data, "favorite_articles"));
    }
  }

  render() {
    const singer = this.props.singer;
    if (!singer) return null;
    const favoriteArticles = this.state.favorite_articles;
    const checkFavorite = favoriteArticles.findIndex(item =>
      item.user_id === App.auth.id && item.article_id === singer.id);
    let numberFavorite = 0;
    favoriteArticles.map((item, index) => {
      if (item.article_id === singer.id) {numberFavorite += 1}
    });

    return (
      <div className="singer">
        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="image-singer">
                <div className="border-image-singer">
                  <img src="/images/logo.jpg" />
                </div>
              </div>
            </div>
        </div>
        <div className="col-md-9 col-lg-9 col-sm-9 col-xs-12">
          <div className="row">
            <div className="info-singer">
              <span className="name-singer">
                {singer.name}
              </span>
              <cm.RaisedButton
                icon={checkFavorite > -1 ? <Done /> : <Add />}
                className="follow-singer"
                primary={true}
                onClick={(event) => this.handleCareSinger(event, singer, favoriteArticles[checkFavorite])}/>
              <span>{numberFavorite}</span>
            </div>
            <div className="content">
              {singer.content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
