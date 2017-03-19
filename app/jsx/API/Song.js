import BaseAPI from "./BaseAPI";

export default class Song extends BaseAPI {
  static get basePath() {
    return "songs";
  }
}
