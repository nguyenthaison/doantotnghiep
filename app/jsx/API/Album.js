import BaseAPI from "./BaseAPI";

export default class Album extends BaseAPI {
  static get basePath() {
    return "albums";
  }
}
