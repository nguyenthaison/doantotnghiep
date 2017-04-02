
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
      isActive = item === true
    } else {
      isActive = this.props.currentPath.split("/")[1] === item
    }

    let menuItemIcon = <i className="material-icons">{icon}</i>;
    // isCustomIcon ?
    //   <i className={icon + (isActive ? "-active" : "")}>
    //     <img src={isActive ? theme.urlIconMenuFaq : theme.defaultIconMenuFaq} />
    //   </i> :
    //   <i className="material-icons">{icon}</i>;

    // if (!App.auth.authorized_pages[item]) return null;

    let innerDivStyle = {
      background: isActive ? theme.secondaryColor : null,
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
    let bigLogo = "/images/headphone.jpg";
    let smallLogo = "/images/logo.png"
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
            {this.renderMenuItem("Home", "/", "home")}
            {this.renderMenuItem("Subject", "/subjects", "subject")}
            {this.renderMenuItem("Ranking", "/ranks", "filter_list")}
            {this.renderMenuItem("Album", "/albums", "album")}
            {this.renderMenuItem("Song", "/songs", "library_music")}
            {this.renderMenuItem("Artist", "/artists", "people")}
            {this.renderMenuItem("Personal", "/personal", "account_circle")}
            {this.renderMenuItem("Upload", "/upload", "cloud_upload")}
          </mui.Menu>
          <div className="drawer-toggle" onClick={this.props.onToggle}></div>
        </div>
      </mui.Drawer>
    );
  }
}
