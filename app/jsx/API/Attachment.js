import BaseAPI from "./BaseAPI";

export default class Attachment extends BaseAPI {
  static create(callback, attachment) {
    this.sendAjax(callback, {
      url: "attachments",
      method: "POST",
      processData: false,
      contentType: false,
      data: attachment
    });
  }
}
