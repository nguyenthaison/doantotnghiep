
export default class Drawer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  handleTouchMenu = (e, menuItem) => {
    Helper.transitionTo(menuItem.props.value);
  }

  renderMenuItem(item, transitionTo, icon, isCustomIcon, rightIcon) {
    let isActive;
    if (this.props.currentPath === "/") {
      isActive = item === Object.keys(App.auth.authorized_pages)[0]
    } else {
      isActive = this.props.currentPath.split("/")[1] === item
    }
    let menuItemIcon = <i className="material-icons">{icon}</i>;
    if (!App.auth.authorized_pages[item]) return null;

    let innerDivStyle = {
      background: isActive ? "#56bfb5" : null,
      paddingLeft: this.props.collapsed ? "100px" : "50px",
    };

    return (
      <mui.MenuItem
        title={item}
        className={"drawer-item " + (isActive ? "active-item" : "normal-item")}
        innerDivStyle={innerDivStyle}
        primaryText={item}
        leftIcon={menuItemIcon}
        rightIcon={rightIcon}
        value={transitionTo} />
    );
  }

  render() {
    let drawerClass = this.props.collapsed ? "drawer-close" : "drawer-open";
    let width = this.props.collapsed ? 56 : 195;
    let bigLogo = "/images/logo.jpg";
    let smallLogo = "/images/logo-small.jpeg"
    let logo = this.props.collapsed ? smallLogo : bigLogo;

    return (
      <mui.Drawer open={true} width={width} className="app-drawer">
        <div className={drawerClass}>
          <div className="logo-wrapper pointer">
            <div className="logo" onClick={() => Helper.transitionTo("/")}>
              <img src={logo} width={width} />
            </div>
          </div>
          <mui.Menu onItemTouchTap={this.handleTouchMenu} className="default-cursor">
            {this.renderMenuItem("home", "/", "home")}
            {this.renderMenuItem("subjects", "/subjects", "subject")}
            {this.renderMenuItem("ranks", "/ranks", "filter_list")}
            {this.renderMenuItem("albums", "/albums", "album")}
            {this.renderMenuItem("artists", "/artists", "people")}
            {this.renderMenuItem("personal", "/personal", "account_circle")}
            {this.renderMenuItem("upload", "/upload", "cloud_upload")}
            {this.renderMenuItem("admin", "/admin", "supervisor_account")}
          </mui.Menu>
          <div className="drawer-toggle" onClick={this.props.onToggle}></div>
        </div>
      </mui.Drawer>
    );
  }
}
