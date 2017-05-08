export default class Form extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: {},
      errors: [],
    };
    this.apiName = "";
    this.additionData = {};
    this.showDeleteButton = true;
  }

  open = (data, additionData) => {
    this.setState({
      show: true,
      data: data || this.defaultData || {id: null},
      errors: [],
    });
    this.additionData = additionData;
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
    let data = this.getDataForSubmit();
    this.setState({
      data: data,
    });

    if (this.state.data.id) {
      API[this.apiName].update(this.handleValidateCallback, data,
        {only_validate: true});
    } else {
      API[this.apiName].create(this.handleValidateCallback, data,
        {only_validate: true});
    }
  }

  handleValidateCallback = (status, data) => {
    if (status) {
      this.refs.objectDetail.open(this.state.data, this.additionData);
      this.setState({
        errors: [],
      });
    } else {
      if (this.handleValidateFail) {
        this.handleValidateFail(data);
      } else {
        this.setState({
          errors: data || [],
        });
      }
    }
  }

  handleChangeTextField = (fieldName, newValue) => {
    let newState = update(this.state.data, {[fieldName]: {$set: newValue}});
    this.setState({data: newState});
  }

  handleChangeSelectField = (fieldName, items, selectedId) => {
    let obj = this.getObjectFromId(items, selectedId)
    let data = update(this.state.data,
      {$merge: {
        [`${fieldName}_id`]: selectedId,
        [fieldName]: obj,
      }}
    );

    this.setState({
      data: data,
    });
  }

  handleAccept = () => {
    let data = this.getDataForSubmit();
    if(this.state.data.id) {
      API[this.apiName].update(this.handleSaveCallback, data);
    } else {
      API[this.apiName].create(this.handleSaveCallback, data);
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

  handleClickDetele = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleConfirmDelete);
  }

  handleConfirmDelete = () => {
    API[this.apiName].delete(this.handleDeleteCallback, this.state.data.id);
  }

  handleDeleteCallback = (status, data) => {
    if (status) {
      this.close();
      Helper.showMessage(t("common.message.deleted_success"));
      this.props.onSubmit();
    }
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
    let label = t(`${this.props.transPath}.attributes.${fieldName}`);
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

  renderSelectField(fieldName, value, items, options) {
    let error = this.state.errors[fieldName];
    return (
      <cm.SelectField
        fieldName={t(`${this.props.transPath}.attributes.${fieldName}`)}
        value={value}
        onChange={(event, key, payload) => {
          this.handleChangeSelectField(fieldName, items, payload);
          if (options.additionCallback) options.additionCallback();
        }}
        items={items}
        errorText={error ? error[0] : null}
        fullWidth={true}
        {...options}
      />
    );
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
    return(
      <div></div>
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
        <this.objectDetail ref="objectDetail"
          transPath={this.props.transPath}
          parent={this.props.parent}
          additionData={this.props.additionData}
          isConfirmation={true}
          onAccept={this.handleAccept} />
      </div>
    )
  }
}
