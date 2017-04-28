import BaseAPI from "./BaseAPI";

export default class PlayListSong extends BaseAPI {
  static get basePath() {
    return "play_list_songs";
  }
}
