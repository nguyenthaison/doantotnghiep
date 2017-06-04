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
      lyrics: null,
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

  getObjectFromId(items, id) {
    return items.find(item => item.id === id);
  }

  handleClickSubmit = () => {
    let data = this.state.data;
    let avatarIds = this.refs.avatar.getAttachmentIds();
    avatarIds = avatarIds.length > 0 ? avatarIds : [""];
    data["attachment_ids"] = avatarIds;
    data["album_id"] = this.props.parent.id;

    // let index = data.album_songs.map((albumSong) => albumSong.album_id === this.props.parent.id)
    // if (index === -1) {
    //   rssSources = update(data.album_songs, {[index]: {album_id: {$set: value}}});
    //   let data = update(this.state.data, {rss_sources: {$set: rssSources}});
    // }

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

  // handleChangeInputText = (fieldName, value) => {
  //   let lyrics = this.state.data.lyrics || [],
  //   newLyrics = update(lyrics, {$push: [{song_id: this.state.data.id},
  //     {user_id: App.auth.id}, {content: value}]});
  //   let data = update(this.state.data, {lyrics: {$set: newLyrics}});

  //   this.setState({
  //     data: data,
  //   });
  // }

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
    // let lyric = data.lyrics && data.lyrics.length > 0 ? data.lyrics[0].content : "";

    return(
      <div>
        <div className="row">
          <div className="col-xs-4">
            {this.renderUpLoadLogoField("avatar", data.attachments, "Avatar")}
          </div>
          <div className="col-xs-8">
            {this.renderTextInput("name",
              {maxLength: 80, required: true})}

            <Singer singers={this.state.listSinger} ref="singers"
              defaultSelectSingers={data.singers} />

            {/*<cm.TextField
              name="lyric"
              fullWidth={true}
              fieldName="lyric"
              value={lyric}
              multiLine={true}
              onChange={(event, value) => this.handleChangeInputText("content", value)}
            />*/}
          </div>
        </div>
      </div>
    )
  }

  renderUpLoadLogoField(ref, attachment, label) {
    return (
      <div>
        <h4>
          <i className="material-icons">panorama</i>
          <span>{label}</span>
        </h4>
        <div className="avatar col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <div className="upload">
            <cm.FileUploader ref={ref} defaultFiles={attachment} numberUploadFile={1} />
          </div>
        </div>
      </div>
    );
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
