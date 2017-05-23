import {browserHistory} from 'react-router';

export default class Register extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      user: {
        login_id: "",
        password: "",
        name: "",
        password_confirmation: "",
        email: "",
        phone_number: "",
        dob: "",
        country_id: "",
      },
      errors: "",
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
      this.handleSubmit();
    }
  }

  // handleValidate = () => {
  //   const user = this.state.user;
    // let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // re.test(user.email)
  // }

  handleChangeInputField = (fieldName, value) => {
    let newState = update(this.state.user, {[fieldName]: {$set: value}});
    this.setState({user: newState});
  }

  handleSubmit = () => {
    API.User.create(this.handleRegister, this.state.user);
  }

  handleRegister = (status, data) => {
    if (status) {
      Helper.showMessage("Register successfull!", "success");
      this.handleClose();
      this.props.onRegister();
    } else {
      this.setState({
        errors: data,
      })
    }
  }

  renderTextField(fieldName, required) {
    const errors = this.state.errors;

    return (
      <cm.TextField
        fieldName={fieldName}
        fullWidth={true}
        hintText={t(`login.${fieldName}`)}
        value={this.state.user[fieldName]}
        onKeyDown={this.handleKeyDownSubmit}
        onChange={(event, value) => this.handleChangeInputField(fieldName, value)}
        required={required}
        errorText={required && errors && errors[fieldName] ? errors[fieldName][0] : null}
        type={fieldName === "password" || fieldName === "password_confirmation" ? "Password" : "text"}
      />
    )
  }

  render() {
    let actionButton = (
      <cm.RaisedButton
        style={{minWidth: "110px"}}
        label={t("common.save")}
        primary={true}
        onClick={this.handleSubmit}
      />
    );

    let content = (
      <div className="change-password-form">
        {this.renderTextField("name", true)}
        {this.renderTextField("login_id", true)}
        {this.renderTextField("email", true)}
        {this.renderTextField("password", true)}
        {this.renderTextField("password_confirmation", true)}
        {this.renderTextField("phone_number")}
      </div>
    );

    return (
      <div>
        <cm.Dialog
          title="Register"
          icon={<i className="material-icons">lock</i>}
          actions={actionButton}
          onRequestClose={this.close}
          open={this.state.open}
          children={content}
        />
      </div>
    )
  }
}

