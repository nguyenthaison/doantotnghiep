import Dialog from "../Dialog";

export default class AttachmentList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAttachmentDialog: false,
      selectedAttachment: null,
    }
  }

  handleShowAttachmentDialog = (attachment) => {
    this.setState({
      selectedAttachment: attachment,
      showAttachmentDialog: true,
    });
  }

  handleCloseAttachmentDialog = () => {
    this.setState({
      showAttachmentDialog: false,
    });
  }

  renderAttachmentList() {
    return this.props.attachments.map(attachment => {
      return(
        <div key={attachment.id}>
          <div className="attachment-border">
            <div className="attachment-item">
              <label className="attachment-name ellipsis-text" title={attachment.attachment_file_name}>
                {t("faquestions.detail.file")}:{attachment.attachment_file_name}
              </label>
              <img src={attachment.thumb_url} onClick={() => this.handleShowAttachmentDialog(attachment)}/>
            </div>
          </div>
        </div>
      );
    });
  }

  renderAttachmentDialog() {
    let attachment = this.state.selectedAttachment;
    if(!attachment) return null;

    return(
      <div>
        <Dialog
          title={attachment.attachment_file_name}
          className="preview-attachment-dialog"
          onRequestClose={this.handleCloseAttachmentDialog}
          open={this.state.showAttachmentDialog}
        >
          {attachment.attachment_content_type.includes("video") ?
            <video
              className="img-dialog" controls preload="auto" width="100%"
              height="auto" poster={attachment.thumb_url}>
              <source src={attachment.url} type={attachment.attachment_content_type}></source>
            </video>
            :
            <img src={attachment.url} className="img-dialog"/>
          }
        </Dialog>
      </div>
    );
  }

  render() {
    return (
      <div className="row list-attachment">
        {this.renderAttachmentDialog()}
        {this.renderAttachmentList()}
      </div>
    );
  }
}
