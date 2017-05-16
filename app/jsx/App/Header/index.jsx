import HeaderItem from './item.jsx';
import Login from "./Login";
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import UserDrawer from "./../UserDrawer";

export default class HeaderMenu extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    }
  }

  handleOpenDrawer = (ref) => {
    this.refs[ref].open();
  }

  setToolBar = (title, linkTo) => {
    this.setState({
      title: title,
      linkTo: linkTo,
    });
  }

  handleLogin = (user) => {
    this.props.onLogin();
    App.auth["id"] = user.id;
    App.auth["name"] = user.name;
    this.forceUpdate();
  }

  renderButton = () => {
    return (
      <cm.RaisedButton
        icon={<AddCircle />}
        className="btn-header-menu big-icon"
        primary={true}
        label={t("common.create")}
        transitionTo={this.state.linkTo}
      />
    )
  }

  render() {
    let ref = App.auth.id === 2 ? "login" : "userDrawer";

    return (
      <div className="header-bar">
        <h4>{this.state.title}</h4>
        <ul>
          <li><HeaderItem icon="perm_identity" className="pointer"
            onClick={() => this.handleOpenDrawer(ref)} />
          </li>
        </ul>
        <UserDrawer ref="userDrawer" />
        <Login ref="login" onLogin={this.handleLogin} />
      </div>
    )
  }
}
