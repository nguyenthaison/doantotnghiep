const style = {
  image: {
    height: "300px",
    width: "300px",
  }
}

export default class AlbumDetail extends PageComponent {
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
    const defaultImg = "/images/default-playlist.jpg";
    const avatar = data.attachments[0] ? data.attachments[0].url : defaultImg
    let singers = "";

    if (data.singers.length === 0 || data.singers.length > 3) {
      singers = "Many Singers";
    } else {
      for (let _item of data.singers) {
        let childItemFormat = " "+ _item.name + ",";
        singers += childItemFormat;
      };
      singers = singers.replace(/.$/," ");
    }

    return (
      <div className="row">
        <div className="col-xs-4">
          <div className="col-label item">Avatar</div>
          <div><img src={avatar} style={style.image} /></div>
        </div>
        <div className="col-xs-8">
          {this.renderDataRow(t("common.attributes.id"), data.id)}
          {this.renderDataRow(t("albums.attributes.name"), data.name)}
          {this.renderDataRow(t("albums.attributes.singer"), singers)}
          {this.renderDataRow(t("common.attributes.country"), data.country.full_name)}
          {this.renderDataRow(t("albums.attributes.view"), data.view)}
          {this.renderDataRow(t("common.attributes.created_at"), data.created_at)}
          {this.renderDataRow(t("common.attributes.updated_at"), data.updated_at)}
          {this.renderDataRow(t("albums.attributes.notes"), data.notes)}
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
