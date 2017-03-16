import {browserHistory} from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from "../theme";
import ConfirmDialog from "./ConfirmDialog"
import AlertDialog from "./AlertDialog"

import {ToastContainer, ToastMessage} from "react-toastr";
var ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class Helper extends BaseComponent {
  constructor(props) {
    super(props);
    global.Helper = this;
    this.history = browserHistory;
  }

  showMessage(message, type = "success", title = "") {
    this.refs.toastContainer[type](
      title,
      message, {
        timeOut: 2000,
        extendedTimeOut: 1000,
    });
  }

  showConfirm(title, content, onSubmit = () => {}) {
    this.refs.confirmDialog.open(title, content, onSubmit)
  }

  showAlert(title, content, onSubmit = () => {}) {
    this.refs.alertDialog.open(title, content, onSubmit);
  }

  showErrors(data, target=null) {
    if (typeof data === "object" && target) {
      for (var key in data) {
        this.showMessage(t(`${target}.attributes.${key}`) + " " + data[key][0], "error");
      }
    } else {
      this.showMessage(data, "error");
    }
  }

  formatDate(date) {
    let options = {year: "numeric", month: "2-digit", day: "2-digit"};
    let result = new Date(date).toLocaleDateString("ja", options).replace(/\//g,"-");
    return result;
  }

  formatDateRange(fromDate, toDate) {
    let startDate = this.formatDate(fromDate);
    let endDate = toDate ? this.formatDate(toDate) : t("common.no_deadline");
    let dateRange = startDate + " ~ " + endDate
    return dateRange;
  }

  transitionTo(pathName, state = {}) {
    let location = {pathname: pathName};
    location["state"] = state;

    browserHistory.push(location);
  }

  getCurrentPath() {
    return browserHistory.getCurrentLocation().pathname;
  }

  getCurrentLocationState() {
    return browserHistory.getCurrentLocation().state || {};
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <ToastContainer ref="toastContainer"
            toastMessageFactory={ToastMessageFactory}
            preventDuplicates={false}
            className="toast-top-right" />
          <ConfirmDialog ref="confirmDialog"/>
          <AlertDialog ref="alertDialog" />
        </div>
      </MuiThemeProvider>
    );
  }
}
