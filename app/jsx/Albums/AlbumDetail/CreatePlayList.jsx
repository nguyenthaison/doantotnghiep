import Clear from "material-ui/svg-icons/content/clear";

export default class CreatePlayList extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      openForm: false,
      play_list: {},
      errors: {},
    }
  }

  handleOpenForm = () => {
    this.setState({
      openForm: true,
    })
  }

  handleChangeTextField = (fieldName, value) => {
    let play_list = update(this.state.play_list, {[fieldName]: {$set: value}});
    this.setState({
      play_list: play_list,
    });
  }

  handleCreatePlayList = () => {
    API.PlayList.create(this.handleSubmitForm, this.state.play_list);
  }

  handleSubmitForm = (status, data) => {
    if (!status) {
      this.setState({
        errors: data || {},
      });
    } else {
      this.props.onCreate();
      Helper.showMessage(t("common.message.updated_success"));
    }
  }

  handleCancelCreatePlayList = () => {
    this.setState({
      openForm: false,
    })
  }

  handleClearContentInput = () => {
    let play_list = update(this.state.play_list, {name: {$set: null}});
    this.setState({
      play_list: play_list,
    });
  }

  renderContent() {
    let openForm = this.state.openForm;
    const error = this.state.errors;

    return (
      <div>
        {openForm ?
          <div className="popup-create">
            <cm.TextField
              // fieldName="name"
              hintText="Enter you name"
              name="name"
              errorText={error ? error[0] : null}
              value={this.state.play_list.name || ""}
              onChange={(event, value) => this.handleChangeTextField("name", value)}
            />
            <div className="popup-pointer">
              <Clear className="pointer" onClick={this.handleClearContentInput} />
            </div>
            <cm.RaisedButton
              label={t("common.create")}
              primary={true}
              onClick={this.handleCreatePlayList}
            />
            <cm.RaisedButton
              label={t("common.cancel")}
              primary={true}
              onClick={this.handleCancelCreatePlayList}
            />
          </div> :
          <div onClick={this.handleOpenForm} className="popup-create">
            <span>create new play list</span>
          </div>
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}
