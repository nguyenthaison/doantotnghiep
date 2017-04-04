import {browserHistory} from 'react-router';
import theme from "../theme";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class LoginForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        login_id: "",
        password: "",
      },
      error: false,
    };
  }

  handleChangeInputField = (fieldName, value) => {
    let newState = update(this.state.user, {[fieldName]: {$set: value}});
    this.setState({user: newState});
  }

  handleSubmit = () => {
    API.Authentication.logIn(this.handleSubmitCallBack, this.state.user);
  }

  handleKeyDownSubmit = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmitCallBack = (status, data) => {
    if (status) {
      browserHistory.replace("/");
    } else {
      this.setState({
        error: data,
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="form-login">
          <div className="background-login"></div>
          <h2 className="text-center img-logo"><img src="/images/witty.png"></img></h2>
            <div>
              <div className="col-md-4 col-md-offset-4 form-group">
                <cm.TextField
                  fullWidth={true}
                  floatingLabelText="Login Id"
                  hintText="Login"
                  value={this.state.user.login_id}
                  onKeyDown={this.handleKeyDownSubmit}
                  onChange={(event, value) => this.handleChangeInputField("login_id", value)}
                /><br />
                <cm.TextField
                  fullWidth={true}
                  hintText="Password"
                  floatingLabelText="Password"
                  type="Password"
                  value={this.state.user.password}
                  onKeyDown={this.handleKeyDownSubmit}
                  onChange={(event, value) => this.handleChangeInputField("password", value)}
                /><br />
              </div>
            </div>
            <div className="col-md-4 col-md-offset-4 form-group text-center">
              <cm.RaisedButton
                fullWidth={true}
                backgroundColor="#f49ac1"
                labelColor="#fff"
                label="Login"
                onClick={this.handleSubmit}
              />
            </div>
            <div className="col-md-4 col-md-offset-4 form-group text-center error-login-message">
              {this.state.error}
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
