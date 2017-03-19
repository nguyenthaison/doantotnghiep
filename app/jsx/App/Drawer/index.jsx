
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

    let menuItemIcon = isCustomIcon ?
      <i className={icon + (isActive ? "-active" : "")}>
        <img src={isActive ? theme.urlIconMenuFaq : theme.defaultIconMenuFaq} />
      </i> :
      <i className="material-icons">{icon}</i>;

    // if (!App.auth.authorized_pages[item]) return null;

    let innerDivStyle = {
      background: isActive ? theme.secondaryColor : null,
      paddingLeft: this.props.collapsed ? "100px" : "50px",
    };

    return (
      <mui.MenuItem
        title="Top"
        className={"drawer-item " + (isActive ? "active-item" : "normal-item")}
        innerDivStyle={innerDivStyle}
        primaryText="Top"
        leftIcon={menuItemIcon}
        rightIcon={rightIcon}
        value={transitionTo} />
    );
  }

  render() {
    let drawerClass = this.props.collapsed ? "drawer-close" : "drawer-open";
    let width = this.props.collapsed ? 56 : 195;
    // let auth = App.auth;
    // let defaultBigLogoPath = "/images/headphone.jpg";
    // let defaultSmallLogoPath = "/images/headphone.jpg";
    // let bigLogo = auth && auth.field_logo ? auth.field_logo.thumb_url :
    //   defaultBigLogoPath;
    // let smallLogo = auth && auth.small_field_logo ? auth.small_field_logo.thumb_url :
    //   defaultSmallLogoPath;
    // let logo = this.props.collapsed ? smallLogo : bigLogo;
    let logo = "/images/headphone.jpg";

    return (
      <mui.Drawer open={true} width={width} className="app-drawer">
        <div className={drawerClass}>
          <div className="logo-wrapper pointer">
            <div className="logo" onClick={() => Helper.transitionTo("/")}>
              <img src={logo} width={width} />
            </div>
          </div>
          <mui.Menu onItemTouchTap={this.handleTouchMenu} className="default-cursor">
            {this.renderMenuItem("top", "/", "home")}
          </mui.Menu>
          <div className="drawer-toggle" onClick={this.props.onToggle}></div>
        </div>
      </mui.Drawer>
    );
  }
}
