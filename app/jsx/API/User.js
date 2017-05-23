import BaseAPI from "./BaseAPI";

export default class User extends BaseAPI {
  static get basePath() {
    return "users";
  }
}
