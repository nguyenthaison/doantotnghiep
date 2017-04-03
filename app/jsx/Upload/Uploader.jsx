import FileCloudUpload from "material-ui/svg-icons/file/cloud-upload";
import RaisedButton from "material-ui/RaisedButton";

export default class Uploader extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      processing: false
    }
  }

  handleUploadFiles = (event) => {
    console.log(event);
    let file = event.target.files[0];
    if (!file) return;
    if (file.size > 130*1024*1024) {
      Helper.showErrors(t("manual_files.errors.too_large", {size: 130}));
      return;
    }

    let attachment = new FormData();
    attachment.append("attachment", file);
    // attachment.append("folder_id", this.props.folderId);

    this.setState({
      processing: true,
    });
    console.log(attachment);
    API.Song.create(this.handleSaveCallback, attachment);
  }

  handleSaveCallback = (status, data) => {
    if (status) {
      this.props.onChange(data.song);

      this.setState({
        processing: false,
      });
    } else {
      this.setState({processing: false});

      if (data["attachment_file_size"] || data["attachment_content_type"] ||
        data["attachment_file_name"]) {
        for (let key in data) {
          Helper.showMessage(t(`attachment.${key}`) + " " + data[key][0], "error");
        }
      } else {
        Helper.showMessage(t("attachment.invalid"), "error");
      }
    }
    this.refs.fileInput.value = "";
  }

  render() {
    return (
      <div className="row file-uploader">
        <div className="upload-component">
          <RaisedButton
            primary={true}
            labelPosition="after"
            icon={<FileCloudUpload color="white" />}
            label={this.state.processing ? "Uploading" : "Choose file"}
            className="upload-button"
            title="No file choose"
          >
            <input
              onChange={this.handleUploadFiles}
              type="file"
              className="file-input"
              ref="fileInput"
            />
          </RaisedButton>
        </div>
      </div>
    )
  }
}
