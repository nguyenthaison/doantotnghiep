import BaseAPI from "./BaseAPI";

export default class Country extends BaseAPI {
  static get basePath() {
    return "countries";
  }
}
