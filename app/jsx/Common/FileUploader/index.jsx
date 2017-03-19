import FileCloudUpload from "material-ui/svg-icons/file/cloud-upload";
import RaisedButton from "material-ui/RaisedButton";
import Chip from "material-ui/Chip";

const MAX_NUMBER_UPLOAD_FILE = 4;
const IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const VIDEO_TYPES = ["video/mp4"];
const MAX_IMAGE_SIZE = 3;
const MAX_VIDEO_SIZE = 130;

export default class FileUploader extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      uploadedFiles: this.props.defaultFiles || [],
    }

    this.maxNumberUploadFile = this.props ? this.props.numberUploadFile : MAX_NUMBER_UPLOAD_FILE;
  }

  getAttachmentIds() {
    var uploadedFiles = this.state.uploadedFiles;
    return uploadedFiles.map(attachment => attachment.id);
  }

  validateFile(file) {
    if (this.isValidFileType(file.type, IMAGE_TYPES)) {
      return this.checkFileSize(file.size, MAX_IMAGE_SIZE);
    } else if (this.isValidFileType(file.type, VIDEO_TYPES)) {
      return this.checkFileSize(file.size, MAX_VIDEO_SIZE);
    } else {
      Helper.showMessage(t("attachment.messages.file_type"), "error");
    }

    return false;
  }

  isValidFileType(fileType, constFileType) {
    return constFileType.includes(fileType);
  }

  checkFileSize(fileSize, maxFileSize) {
    if (fileSize < (maxFileSize * 1024 * 1024)) {
      return true;
    } else {
      Helper.showMessage(t("attachment.messages.file_size", {size: maxFileSize}), "error");
    }
  }

  handleUploadFiles = (event) => {
    var file = event.target.files[0];
    var attachment = new FormData();

    if (this.validateFile(file)) {
      attachment.append("attachment", file);
      this.setState({
        processing: true,
      });
      API.Attachment.create(this.handleSaveCallback, attachment);
    }
  }

  handleSaveCallback = (status, data) => {
    if (status) {
      let uploadedFiles = update(this.state.uploadedFiles, {$push: [data.attachment]});

      this.setState({
        uploadedFiles: uploadedFiles,
        processing: false,
      });
    } else {
      this.setState({processing: false});

      if (data["attachment_file_size"] || data["attachment_content_type"]) {
        for (var key in data) {
          Helper.showMessage(t(`attachment.${key}`) + " " + data[key][0], "error");
        }
      } else {
        Helper.showMessage(t("attachment.invalid"), "error");
      }
    }
  }

  handleDeleteFile = (attachment) => {
    let index = this.state.uploadedFiles.indexOf(attachment);
    let uploadedFiles = update(this.state.uploadedFiles, {$splice: [[index, 1]]});
    this.setState({
      uploadedFiles: uploadedFiles,
    });
  }

  renderImage(image) {
    return (
      <div className="list-attachment" key={image.id}>
        <div className="attachment-border">
          <div className="attachment-item">
            <img src={image.thumb_url}/>
            <div className="uploaded-file">
              <Chip
                title={image.attachment_file_name}
                onRequestDelete={() => this.handleDeleteFile(image)}
              >
                {image.attachment_file_name}
              </Chip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderVideo(video) {
    return(
      <div className="list-attachment" key={video.id}>
        <div className="attachment-border">
          <div className="attachment-item">
            <video controls preload="auto" width="150" height="130" poster={video.thumb_url}>
              <source src={video.url} type={video.attachment_content_type}></source>
            </video>
            <div className="uploaded-file">
              <Chip
                title={video.attachment_file_name}
                onRequestDelete={() => this.handleDeleteFile(video)}
              >
                {video.attachment_file_name}
              </Chip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUploadedFile() {
    let uploadedFiles = this.state.uploadedFiles;

    return uploadedFiles.map((attachment) => {
      if (IMAGE_TYPES.includes(attachment.attachment_content_type)) {
        return this.renderImage(attachment);
      } else if (VIDEO_TYPES.includes(attachment.attachment_content_type)) {
        return this.renderVideo(attachment);
      }
    });
  }

  render() {
    let uploadedFiles = this.state.uploadedFiles;
    let disableUpload = this.state.processing ||
      uploadedFiles.length >= this.maxNumberUploadFile;
    return (
      <div className="row file-uploader">
        <div className="upload-component">
          <RaisedButton
            primary={true}
            labelPosition="after"
            disabled={disableUpload}
            icon={<FileCloudUpload color="white" />}
            label={this.state.processing ? t("attachment.btn_uploading") : t("attachment.btn_choose_file")}
            className="upload-button"
          >
            <input
              type="file"
              disabled={disableUpload}
              onChange={this.handleUploadFiles}
              className="file-input"
            />
          </RaisedButton>

          <div className="list-uploaded-file list-file">
            {this.renderUploadedFile()}
          </div>
        </div>
      </div>
    );
  }
}
