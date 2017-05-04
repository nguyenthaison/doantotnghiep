export default class FavoriteArtist extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleFavoriteArtist = (artist, articleType, favoriteArticle) => {
    if (favoriteArticle) {
      API.FavoriteArticle.delete((status, data) => this.handleFavoriteSinger(status, data, favoriteArticle),
        favoriteArticle.id)
      event.stopPropagation();
    } else {
      let favorite_article = {};
      favorite_article["article_type"] = articleType;
      favorite_article["article_id"] = artist.id;
      API.FavoriteArticle.create(this.handleFavoriteSinger, favorite_article)
    }
  }

  handleFavoriteSinger = (status, data, favorite) => {
    if (status) {
      if (favorite) {
        Helper.showMessage("Artist is deleted in your favorite");
      }
      this.props.onChange();
    }
  }

  render() {
    const artist = this.props.artist;
    const articleType = this.props.articleType;
    const favoriteArticles = this.props.favorite_articles;
    const index = favoriteArticles.findIndex((favoriteArticle) =>
      favoriteArticle.article_id === artist.id && favoriteArticle.article_type === articleType);

    return (
      <div className="border-title-album-item">
        <i className="material-icons pointer" style={index !== -1 ? {color: "red"} : {color: "black"}}
          onClick={() => this.handleFavoriteArtist(artist, articleType, favoriteArticles[index])}>
          favorite
        </i>
        {artist.total_favorite}
      </div>
    )
  }
}
