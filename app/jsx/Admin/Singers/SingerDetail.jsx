export default class Detail extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      show: false,
    }
  }

  open = (data) => {
    this.setState({
      show: true,
      data: data,
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

  renderButton = () => {
    return (
      <div className="row">
        <cm.RaisedButton
          className="btn-close"
          label={t("common.close")}
          secondary={true}
          onClick={this.handleClose}
        />
      </div>
    )
  }

  renderDataRow(label, value) {
    return (
      <div className="row detail-row">
        <div className="col-label item">{label}</div>
        <div className="item">{value}</div>
      </div>
    )
  }

  renderContent() {
    const data = this.state.data;

    return (
      <div className="row">
        <div className="col-xs-4">
        </div>
        <div className="col-xs-8">
          {this.renderDataRow(t("common.attributes.id"), data.id)}
          {this.renderDataRow(t("singers.attributes.name"), data.name)}
          {this.renderDataRow(t("common.attributes.age"), data.age)}
          {this.renderDataRow(t("singers.attributes.dob"), data.dob)}
          {this.renderDataRow(t("common.attributes.created_at"), data.created_at)}
          {this.renderDataRow(t("common.attributes.updated_at"), data.updated_at)}
          {this.renderDataRow(t("singers.attributes.content"), data.content)}
        </div>
      </div>
    )
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <cm.Dialog
        dialogType={t("common.detail")}
        title={this.state.data.name}
        className="base-master-detail"
        actions={this.renderButton()}
        onRequestClose={this.handleClose}
        open={this.state.show}>
        <div className="master-detail-content">
          {this.renderContent()}
        </div>
      </cm.Dialog>
    );
  }
}
