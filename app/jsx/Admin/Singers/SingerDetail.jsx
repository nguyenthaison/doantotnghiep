export default class Detail extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      show: false,
      additionData: {},
    }
  }

  open = (data, additionData) => {
    this.setState({
      show: true,
      data: data,
      additionData: additionData
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

  handleClickOk = () => {
    this.close();
    this.props.onAccept();
  }

  handleShowChildren = () => {
    this.props.onShowChildren(this.state.data);
    this.close();
  }

  renderButton = () => {
    if (this.props.isConfirmation) {
      return(
        <div>
          <div className="confirm-question">
            {this.state.data.id ? t("master.confirm_edit") : t("master.confirm_create")}
          </div>
          <div>
            <cm.RaisedButton
              className="btn-mr5"
              label={t("common.cancel")}
              secondary={true}
              onClick={this.handleClose} />
            <cm.RaisedButton
              label={t("common.ok")}
              primary={true}
              onClick={this.handleClickOk} />
          </div>
        </div>
      )
    } else {
      let child = this.props.child;
      if (!child) return;
      return (
        <div className="row">
          <cm.RaisedButton
            className="btn-close"
            label={t(`${this.props.transPath}.child`)}
            secondary={true}
            onClick={this.handleShowChildren} />
        </div>
      )
    }
  }

  renderDataRow = (content, key) => {
    let data = this.state.data;
    if (typeof content == "string") {
      return (
        <div className="row detail-row" key={key}>
          <div className="col-label item">{t(`${this.props.transPath}.attributes.${content}`)}</div>
          <div className="col-value item">{data[content]}</div>
        </div>
      );
    }
    else {
      return (
        <div key={content.key} className="row detail-row">
          <div className="col-label item">{content.name}</div>
          <div className="col-value item">{content.value}</div>
        </div>
      );
    }
  }

  renderIdField = () => {
    let data = this.state.data;
    let idField = "";

    if (!this.props.isConfirmation) {
      idField = data.id ? this.renderDataRow({name: t("common.attributes.id"), value: data.id}) : "";
      return idField;
    }
  }

  renderAuthor = () => {
    let data = this.state.data;

    if(!this.props.isConfirmation) {
      return(
        <div>
          <div className="row detail-row">
            <div className="col-label item">{t("common.attributes.created_at")}</div>
            <div className="col-value-half item">{data.created_at}</div>
            <div className="col-label item">{t("common.attributes.updated_at")}</div>
            <div className="col-value-half item">{data.updated_at}</div>
          </div>
          <div className="row detail-row">
            <div className="col-label item">{t("common.attributes.creator_id")}</div>
            <div className="col-value-half item">{data.creator ? data.creator.name : ""}</div>
            <div className="col-label item">{t("common.attributes.updater_id")}</div>
            <div className="col-value-half item">{data.updater ? data.updater.name : ""}</div>
          </div>
        </div>
      )
    }
  }

  renderPrimaryFields() {
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <cm.Dialog
        dialogType={this.props.isConfirmation ? t("common.confirmation") :
          t("common.detail")}
        title={this.state.data.name}
        className="base-master-detail"
        actions={this.renderButton()}
        onRequestClose={this.handleClose}
        open={this.state.show}>
        <div className="master-detail-content">
          {this.renderIdField()}
          {this.renderPrimaryFields()}
          {this.renderAuthor()}
        </div>
      </cm.Dialog>
    );
  }
}
