import BaseAPI from "./BaseAPI";

export default class Singer extends BaseAPI {
  static get basePath() {
    return "singers";
  }
}
