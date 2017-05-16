import ChangePasswordDialog from "./ChangePasswordDialog";
import Divider from "material-ui/Divider";

const style = {
  menuItem: {
    paddingLeft: "50px",
    height: "48px",
    width: "250px",
  },
  subTitle: {
    paddingLeft: "16px",
    fontSize: "20px",
  },
};

export default class UserDrawer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      openChangePasswordDialog: false,
    }

    // switch(App.auth.role) {
    //   case "pms_admin":
    //     break;
    //   case "admin":
    //     this.showCompany = true;
    //     break;
    //   case "manager":
    //   case "member":
    //     this.showCompany = true;
    //     this.showOrganization = true;
    //     this.showDepartment = true;
    //     this.showTeam = true;
    //     this.showPosition = true;
    //     break;
    // }
  }

  open = () => {
    this.refs.drawer.open();
  }

  handleOpenChangePasswordDialog = () => {
    this.refs.changePasswordDialog.open();
  }

  handleLogout = () => {
    $.ajax({
      url: "/users/sign_out",
      method: "DELETE",
      success(response) {
        window.location.href = "/";
      }
    });
  }

  renderMenuItem(item, icon, onClick) {
    return (
      <mui.MenuItem
        title={item}
        innerDivStyle={style.menuItem}
        primaryText={item}
        leftIcon={<i className="material-icons">{icon}</i>}
        onClick={onClick} />
    );
  }

  renderItemInfo(name, icon, styleItem = style.menuItem) {
    return (
      <mui.MenuItem
        className="info"
        title={name}
        innerDivStyle={styleItem}
        primaryText={name}
        leftIcon={<i className="material-icons">{icon}</i>} />
    );
  }

  render() {
    let auth = App.auth;
    let companyName = auth.company ? auth.company.name : "";
    let teamName = auth.team ? auth.team.name : "";

    return (
      <cm.Drawer
        ref="drawer"
        className="user-drawer">
        <div className="title">
          {App.auth.name}
        </div>
        <mui.Menu className="default-cursor main-function">
          {this.renderMenuItem("change_password", "lock", this.handleOpenChangePasswordDialog)}
          {this.renderMenuItem("sign_out", "input", this.handleLogout)}
        </mui.Menu>

        <mui.Menu>
          <Divider />
          {this.renderItemInfo("User Informations",
            "", style.subTitle)}
          <Divider />
          {/*this.showCompany ? this.renderItemInfo(companyName, "business") : ""*/}
          {/*this.showOrganization ? this.renderItemInfo(auth.organization_name, "location_city") : ""*/}
          {/*this.showDepartment ? this.renderItemInfo(auth.department_name, "group_work") : ""*/}
          {/*this.showTeam ? this.renderItemInfo(teamName, "people") : ""*/}
          {/*this.showPosition ? this.renderItemInfo(auth.position_name, "person_pin") : ""*/}
          {/*this.renderItemInfo(t(`master.users.roles.${auth.role}`), "record_voice_over")*/}
        </mui.Menu>
        <ChangePasswordDialog ref="changePasswordDialog" />
      </cm.Drawer>
    );
  }
}
