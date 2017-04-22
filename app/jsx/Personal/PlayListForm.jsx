import Save from "material-ui/svg-icons/content/save";

export default class PlayListForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: {},
      errors: [],
    };
  }

  open = (data) => {
    this.setState({
      show: true,
      data: data || {id: null},
      errors: [],
    });
  }

  close = () => {
    this.setState({
      show: false,
    });
  }

  getDataForSubmit() {
    let attachment_ids = this.refs.fileUpload.getAttachmentIds();
    console.log(attachment_ids);
    return this.state.data;
  }

  handleClose = () => {
    this.close();
  }

  handleClickSubmit =() => {
    let data = this.getDataForSubmit();

    if (data.id) {
      API.PlayList.update(this.handleSaveCallback, data);
    } else {
      API.PlayList.create(this.handleSaveCallback, data);
    }
  }

  handleSaveCallback = (status, data) => {

    if (status) {
      this.close();
      if (this.state.data.id) {
        Helper.showMessage(t("common.message.updated_success"));
      } else {
        Helper.showMessage(t("common.message.created_success"));
      }
      this.props.onSubmit();
    } else {
      this.setState({
        errors: data || [],
      });
    }
  }

  handleChangeTextField = (fieldName, newValue) => {
    let newState = update(this.state.data, {[fieldName]: {$set: newValue}});
    this.setState({data: newState});
  }

  renderDialogContent() {
    return (
      <div className="input-text col-md-9">
        {this.renderTextInput("name", {
          maxLength: 80,
          required: true
        })}
        {this.renderTextInput("describe", {
          maxLength: 600,
          multiLine: true,
          rows: 1,
          rowsMax: 6,
          textareaStyle: {height: "74%"}
        })}
      </div>
    )
  }

  renderTextInput(fieldName, options) {
    let error = this.state.errors[fieldName];
    let label = t(`play_lists.attributes.${fieldName}`);

    return (
      <cm.TextField
        fieldName={label}
        hintText={label}
        errorText={error ? error[0] : null}
        value={this.state.data[fieldName] || ""}
        onChange={(event, value) => this.handleChangeTextField(fieldName, value)}
        fullWidth={true}
        {...options}
      />
    )
  }

  renderButton() {
    let data = this.state.data;
    return(
      <div>
        <cm.RaisedButton
          label={t("common.save")}
          labelPosition="after"
          primary={true}
          onClick={this.handleClickSubmit}
          icon={<Save />} />
      </div>
    )
  }

  render() {
    return (
      <cm.Dialog
        actions={this.renderButton()}
        onRequestClose={this.handleClose}
        open={this.state.show}
        dialogType="Create">
        <div className="base-master-form row">
          <div className="avatar col-md-3">
            <div className="upload">
              <cm.FileUploader ref="fileUpload"/>
            </div>
          </div>
          {this.renderDialogContent()}
        </div>
      </cm.Dialog>
    )
  }
}
