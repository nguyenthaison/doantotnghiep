import BaseAPI from "./BaseAPI";

export default class Author extends BaseAPI {
  static get basePath() {
    return "authors";
  }
}
