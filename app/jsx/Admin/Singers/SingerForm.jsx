const styles = {
  note: {
    height: "74%",
  }
}
import SelectCountry from "./SelectCountry";
export default class Form extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: {id: null},
      errors: "",
      countries: [],
    };

    this.showDeleteButton = true;
  }

  open = (_data) => {
    API.Country.getList((status, data) => this.handleGetListCountry(status, data, _data));
  }

  close = () => {
    this.setState({
      show: false,
    });
  }

  handleGetListCountry = (status, data, _data) => {
    if (!status) return;
    this.setState({
      show: true,
      data: _data || {id: null},
      errors: [],
      countries: data.countries,
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
    const country_id = this.refs.selectCountry.getSelectedCountry();
    data["country_id"] = country_id;

    if(this.state.data.id) {
      API.Singer.update(this.handleSaveCallback, data);
    } else {
      API.Singer.create(this.handleSaveCallback, data);
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
    const attachments = this.state.data;

    return(
      <div>
        <div className="row">
          <div className="col-xs-4">
            <div className="upload">
              {/*<cm.FileUploader ref="fileUpload" defaultFiles={this.state.data}/>*/}
            </div>

            <div className="upload">
              {/*<cm.FileUploader ref="fileUpload" defaultFiles={this.state.data}/>*/}
            </div>
          </div>
          <div className="col-xs-8">
            {this.renderTextInput("name",
              {maxLength: 80, required: true})}

            {this.renderLabel("Dob")}
            <mui.DatePicker hintText="Date of birth"
              onChange={this.handleChangeDatePicker}
            />

            <SelectCountry fieldName="country_id"
              countries={this.state.countries}
              selectedCountry={this.state.data.country_id}
              ref="selectCountry"
            />

            {this.renderTextInput("content", {
              multiLine: true,
              textareaStyle: styles.note,
              rowsMax: 5,
            })}
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
