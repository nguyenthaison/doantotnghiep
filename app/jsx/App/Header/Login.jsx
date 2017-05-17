import {browserHistory} from 'react-router';

export default class Login extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      user: {
        login_id: "",
        password: "",
      },
      error: false,
    }
  }

  open = () => {
    this.setState({
      open: true,
    })
  }

  close = () => {
    this.setState({
      open: false,
    })
  }

  handleClose = () => {
    this.close();
  }

  handleKeyDownSubmit = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  }

  handleLogin = () => {
    API.Authentication.logIn(this.handleSubmitCallBack, this.state.user);
  }

  handleSubmitCallBack = (status, data) => {
    if (status) {
      Helper.showMessage("Login Successfull", "success");
      this.handleClose();
      this.props.onLogin(data.user);
    } else {
      this.setState({
        error: data,
      });
    }
  }

  handleChangeInputField = (fieldName, value) => {
    let newState = update(this.state.user, {[fieldName]: {$set: value}});
    this.setState({user: newState});
  }

  render() {
    const loginFields = ["login_id", "password"];

    let actionButton = (
      <cm.RaisedButton
        style={{minWidth: "110px"}}
        label={t("common.save")}
        primary={true}
        onClick={this.handleLogin}
      />
    );

    let content = (
      <div className="change-password-form">
        <cm.TextField
          fullWidth={true}
          floatingLabelText={t("login.login_id")}
          hintText={t("login.login_id")}
          value={this.state.user.login_id}
          onKeyDown={this.handleKeyDownSubmit}
          onChange={(event, value) => this.handleChangeInputField("login_id", value)}
        /><br />
        <cm.TextField
          fullWidth={true}
          hintText={t("login.password")}
          floatingLabelText={t("login.password")}
          type="Password"
          value={this.state.user.password}
          onKeyDown={this.handleKeyDownSubmit}
          onChange={(event, value) => this.handleChangeInputField("password", value)}
        /><br />
      </div>
    );

    return (
      <cm.Dialog
        title="Login"
        icon={<i className="material-icons">lock</i>}
        actions={actionButton}
        onRequestClose={this.close}
        open={this.state.open}
        children={content}
      />
    )
  }
}
