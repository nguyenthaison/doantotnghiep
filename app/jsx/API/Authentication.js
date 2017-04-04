import BaseAPI from "./BaseAPI";

export default class Authentication extends BaseAPI {
  static getList(callback) {
    this.sendAjax(callback, {
      url: "authentication",
    });
  }

  static logIn(callback, user) {
    this.sendAjax(callback, {
      url: "sessions",
      method: "POST",
      data: user
    });
  }

  static changeField(callback, fieldId) {
    this.sendAjax(callback, {
      url: "change_field",
      method: "POST",
      data: {field_id: fieldId},
    });
  }

  static getContribution(callback) {
    this.sendAjax(callback, {
      url: "get_contribution",
      method: "GET",
    });
  }
}
