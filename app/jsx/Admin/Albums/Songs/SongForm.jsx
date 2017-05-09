const styles = {
  note: {
    height: "74%",
  }
}

import Singer from "../../../Upload/Singer";

export default class SongForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: {id: null},
      errors: "",
      listSinger: [],
    };

    this.showDeleteButton = true;
  }

  open = (_data) => {
    this.setState({
      show: true,
      data: _data || {id: null},
      errors: [],
      listSinger: this.props.parent.singers,
    });
  }

  close = () => {
    this.setState({
      show: false,
    });
  }

  handleClose = () => {
    this.close();
  }

  getDataForSubmit() {
    return this.state.data;
  }

  getObjectFromId(items, id) {
    return items.find(item => item.id === id);
  }

  handleClickSubmit = () => {
    let data = this.state.data;
    if(this.state.data.id) {
      API.Song.update(this.handleSaveCallback, data);
    } else {
      API.Song.create(this.handleSaveCallback, data);
    }
  }

  handleChangeTextField = (fieldName, newValue) => {
    let newState = update(this.state.data, {[fieldName]: {$set: newValue}});
    this.setState({data: newState});
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

  handleClickDetele = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleConfirmDelete);
  }

  handleConfirmDelete = () => {
    API.Singer.delete(this.handleDeleteCallback, this.state.data.id);
  }

  handleDeleteCallback = (status, data) => {
    if (status) {
      this.close();
      Helper.showMessage(t("common.message.deleted_success"));
      this.props.onSubmit();
    }
  }

  handleChangeDatePicker = (index, value) => {
    let newState = update(this.state.data, {dob: {$set: value}});
    this.setState({data: newState});
  }

  renderLabel(fieldName, required = false) {
    let requiredText = required ? <div className="required">{t("common.required")}</div> : "";

    return(
      <label className="small-label">
        {fieldName}
        {requiredText}
      </label>
    );
  }

  renderTextInput(fieldName, options) {
    let error = this.state.errors[fieldName];
    let label = t(`singers.attributes.${fieldName}`);
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
          style={{minWidth: "110px"}}
          label={t("common.save")}
          primary={true}
          onClick={this.handleClickSubmit}
        />
        {this.showDeleteButton && data.id ?
          <cm.RaisedButton
            className="btn-delete"
            label={t("common.delete")}
            secondary={true}
            onClick={this.handleClickDetele}
            style={{minWidth: "110px"}}
          /> : ""
        }
      </div>
    )
  }

  renderDialogContent() {
    const data = this.state.data;

    return(
      <div>
        <div className="row">
          <div className="col-xs-4">

          </div>
          <div className="col-xs-8">
            {this.renderTextInput("name",
              {maxLength: 80, required: true})}

            <Singer singers={this.state.listSinger} ref="singers"
              defaultSelectSingers={data.singers} />

          </div>
        </div>
      </div>
    )
  }

  render() {
    let title = this.state.data.id ? t("common.edit") : t("common.create");
    return (
      <div>
        <cm.Dialog
          actions={this.renderButton()}
          onRequestClose={this.handleClose}
          open={this.state.show}
          dialogType={title}>
          <div className="base-master-form">
            {this.renderDialogContent()}
          </div>
        </cm.Dialog>
      </div>
    )
  }
}
