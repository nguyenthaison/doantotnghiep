import NavigationClose from "material-ui/svg-icons/navigation/close";
import {red600} from "material-ui/styles/colors";

export default class Dialog extends BaseComponent {
  constructor(props) {
    super(props);
  }

  renderIcon() {
    if (this.props.icon) {
      return <span className="dialog-icon">{this.props.icon}</span>
    }
  }

  render() {
    let dialogType = this.props.dialogType ? <div className="dialog-type">{this.props.dialogType}</div> : "";
    let headerModal =(
      <div className="header-modals">
        {this.renderIcon()}
        {dialogType}
        <label className="ellipsis-text">{this.props.title}</label>

        <div className="pull-right">
          <mui.FlatButton
            icon={<NavigationClose color={red600} />}
            className="btn-nav-close"
            onClick={this.props.onRequestClose} />
        </div>
      </div>
    );

    return (
      <mui.Dialog
        {...this.props}
        className={"wrapp-popup dialog " + (this.props.className || "")}
        title={headerModal}
        contentClassName="dialog-content"
        bodyClassName="dialog-body awesome-scroll"
        actionsContainerClassName="area-btn"
        modal={true}
        autoScrollBodyContent={true}
      >
        {this.props.children}
      </mui.Dialog>
    );
  }
}
