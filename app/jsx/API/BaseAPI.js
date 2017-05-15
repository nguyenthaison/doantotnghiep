var pluralize = require("pluralize")

export default class BaseAPI {
  static get objectName() {
    return pluralize.singular(this.basePath);
  }

  static getList(callback, options = {}) {
    this.sendAjax(callback, {
      url: this.basePath,
      data: options,
    });
  }

  static create(callback, object, options = {}) {
    let data = update(options, {$merge: {[this.objectName]: object}});

    this.sendAjax(callback, {
      url: this.basePath,
      method: "POST",
      data: data,
    });
  }

  static get(callback, id, options = {}) {
    this.sendAjax(callback, {
      url: `${this.basePath}/${id}`,
      data: options,
    });
  }

  static update(callback, object, options = {}) {
    let data = update(options, {$merge: {[this.objectName]: object}});

    this.sendAjax(callback, {
      url: `${this.basePath}/${object.id}`,
      method: "PATCH",
      data: data,
    });
  }

  static delete(callback, id) {
    this.sendAjax(callback, {
      url: `${this.basePath}/${id}`,
      method: "DELETE",
    });
  }

  static sendAjax(callback, options) {
    BaseAPI.requestNumber = BaseAPI.requestNumber || 0;
    BaseAPI.requestNumber++;

    options.success = (response) => {
      if (response.error) {
        if (!response.data) {
          Helper.showMessage("Connection error", "error");
        }
      }

      if (callback) {
        callback(response.status, response.data);
      }
    }

    // options.error = (xhr) => {
    //   if (xhr.status == 422 || xhr.status == 401) {
    //     Helper.showAlert("Not login",
    //       "Session is expired, press OK to  reload!",
    //       BaseAPI.handleRequestLogin);
    //       return false;
    //   }

    //   Helper.showMessage("Connection error", "error");

    //   if (callback) {
    //     callback(false);
    //   }
    // }

    options.beforeSend = () => {
      $(".ajax-loading").css({
        visibility: "visible",
        zIndex: "99999",
        opacity: "100"
      });
    }

    options.complete = () => {
      BaseAPI.requestNumber--;

      if (BaseAPI.requestNumber == 0) {
        $(".ajax-loading").css({
          visibility: "hidden",
          zIndex: "-99999",
          opacity: "0"
        });
      }
    }

    options.url = "/api/v1/" + options.url;
    $.ajax(options);
  }

  static handleRequestLogin() {
    window.location.href = "/users/sign_in";
  }
}
