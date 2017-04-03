export default class ChangePasswordDialog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      open: false,
      data: {password: ""},
      errors: {},
    }
  }

  open = () => {
    this.setState({
      open: true,
    });
  }

  close = () => {
    this.setState(this.getDefaultState());
  }

  handleSubmitChangePassword = () => {
    API.User.updatePassword(this.handleChangePasswordCallback, this.state.data);
  }

  handleChangePasswordCallback = (status, data) => {
    if (!status) {
      this.setState({
        errors: data || {},
      });
    } else {
      this.close();
      Helper.showMessage(t("common.message.updated_success"));
    }
  }

  handleChangeTextField = (fieldName, value) => {
    let data = update(this.state.data, {[fieldName]: {$set: value}});
    this.setState({
      data: data,
    });
  }

  renderTextInput(fieldName, name, options) {
    let error = this.state.errors[fieldName];
    return (
      <cm.TextField
        fieldName={name}
        name={fieldName}
        errorText={error ? error[0] : null}
        value={this.state.data[fieldName] || ""}
        onChange={(event, value) => this.handleChangeTextField(fieldName, value)}
        {...options}
      />
    )
  }

  render() {
    const changePasswordFields = ["current_password", "password", "password_confirmation"];

    let actionButton = (
      <cm.RaisedButton
        style={{minWidth: "110px"}}
        label="Save"
        primary={true}
        onClick={this.handleSubmitChangePassword}
      />
    );

    let content = (
      <div className="change-password-form">
        {changePasswordFields.map((field) => {
          return (
            <div key={field}>
              {this.renderTextInput(field, field,
                {required: true, fullWidth: true, type: "password"})}
            </div>
          );
        })}
      </div>
    );

    return (
      /*<cm.Dialog
        title={t("app.user_drawer.change_password")}
        icon={<i className="material-icons">lock</i>}
        actions={actionButton}
        onRequestClose={this.close}
        open={this.state.open}
        children={content}
      />*/
      <div></div>
    );
  }
}
