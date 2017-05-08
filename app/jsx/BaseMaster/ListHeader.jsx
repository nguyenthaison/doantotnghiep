export default class ListHeader extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let headerType = this.props.type ? `${this.props.type}-master-header` : "master-header"
    return (
      <div className={headerType} style={{backgroundColor: theme.secondaryColor}}>
        <div className="left-area">
          {this.props.icon}
          <span className={this.props.className || ""} title={this.props.title}>{this.props.title}</span>
        </div>
        <div className="right-area">
          {this.props.children}
        </div>
      </div>
    );
  }
}
