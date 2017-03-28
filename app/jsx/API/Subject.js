import BaseAPI from "./BaseAPI";

export default class Subject extends BaseAPI {
  static get basePath() {
    return "subjects";
  }
}
