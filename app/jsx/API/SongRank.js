import BaseAPI from "./BaseAPI";

export default class SongRank extends BaseAPI {
  static get basePath() {
    return "song_ranks";
  }
}
