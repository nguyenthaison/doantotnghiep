export default class index extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setToolBar("Admin Page");
  }

  renderButton = (name, transitionTo, icon) => {
    return (
      <div className="master-item"
        onClick={() => Helper.transitionTo(transitionTo)}
        style={{borderTop: "7px solid #7C4DFF" }}
      >
        <i className="material-icons">{icon}</i>
        {name}
      </div>
    )
  }

  render() {
    return (
      <div className="list-master">
        {this.renderButton("users", "admin/users", "account_circle")}
        {this.renderButton("singers", "admin/singers", "account_circle")}
        {this.renderButton("authors", "admin/authors", "account_circle")}
        {this.renderButton("albums", "admin/albums", "album")}
        {this.renderButton("songs", "admin/songs", "audiotrack")}
      </div>
    )
  }
}
