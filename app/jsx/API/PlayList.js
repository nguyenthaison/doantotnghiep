import BaseAPI from "./BaseAPI";

export default class PlayList extends BaseAPI {
  static get basePath() {
    return "play_lists";
  }
}
