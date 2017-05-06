import BaseAPI from "./BaseAPI";

export default class FavoriteArticle extends BaseAPI {
  static get basePath() {
    return "favorite_articles";
  }
}
