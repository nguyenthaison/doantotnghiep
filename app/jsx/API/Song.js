import BaseAPI from "./BaseAPI";

export default class Song extends BaseAPI {
  static get basePath() {
    return "songs";
  }

  // static create(callback, file) {
  //   this.sendAjax(callback, {
  //     url: "songs",
  //     method: "POST",
  //     processData: false,
  //     contentType: false,
  //     data: file
  //   });
  // }
}
