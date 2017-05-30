import BaseAPI from "./BaseAPI";

export default class User extends BaseAPI {
  static get basePath() {
    return "users";
  }

  static updatePassword(callback, user) {
    this.sendAjax(callback, {
      url: "users/update_password",
      method: "PATCH",
      data: {
        user: user,
      },
    });
  }
}
