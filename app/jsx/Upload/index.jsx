import Uploader from "./Uploader";
import Checkbox from "material-ui/Checkbox";
import Countries from "./Countries";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listCountry: [],
      song: {
        name: "",
      },
      lyric: {
        content: "",
      },
      singer: {
        name: "",
      },
      checkedMusicTypes: [],
      country: null,
    }
  }

  componentDidMount() {
    API.Country.getList(this.handleGetListCountry, this.getOption())
  }

  getOption() {
    let include = {
      music_types: {}
    }
    return {
      include: JSON.stringify(include),
    }
  }

  handleGetListCountry = (status, data) => {
    if (!status) return;
    this.setState({
      listCountry: data.countries,
    });
  }

  handleChangeInputNameSong = (fieldName, value) => {
    let newState = update(this.state.song, {[fieldName]: {$set: value}});
    this.setState({song: newState});
  }

  handleChangeInputNameSinger = (fieldName, value) => {
    let newState = update(this.state.singer, {[fieldName]: {$set: value}});
    this.setState({singer: newState});
  }

  handleChangeInputLyric = (fieldName, value) => {
    let newState = update(this.state.lyric, {[fieldName]: {$set: value}});
    this.setState({lyric: newState});
  }

  hanldeClickShowMusicType = (country) => {
    this.setState({
      country: country,
    });
  }

  handleSubmitCallback = (status, data) => {
    if (!status) return;
    Helper.showMessage("Create success");
  }

  handleSubmitForm = () => {
    let data = new FormData();
    let attachment = this.refs.uploadFile.getAttachment();
    let musicTypeIds = this.refs.countries.getCheckedMusicTypes();
    data.append("attachment", attachment);
    data.append("name", this.state.song.name);
    data.append("singer_name", this.state.singer.name);
    data.append("lyric_content", this.state.lyric.content);
    data.append("music_type_song_ids", musicTypeIds);
    API.Song.create(this.handleSubmitCallback, data);
  }

  render() {
    return (
      <div className="home-page">
        <div className="col-md-9">
          <div className="upload-file">
            <div className="box-upload row">
              <div className="col-md-3">
              </div>
              <div className="col-md-9">
                <cm.TextField
                  name="name-song"
                  fullWidth={true}
                  fieldName="name"
                  value={this.state.song.name}
                  onChange={(event, value) => this.handleChangeInputNameSong("name", value)}
                />
                <cm.TextField
                  name="singer"
                  fullWidth={true}
                  fieldName="singer"
                  value={this.state.singer.name}
                  onChange={(event, value) => this.handleChangeInputNameSinger("name", value)}
                />
                <cm.TextField
                  name="lyric"
                  fullWidth={true}
                  fieldName="lyric"
                  value={this.state.lyric.content}
                  onChange={(event, value) => this.handleChangeInputLyric("content", value)}
                />
                <Uploader
                  song={this.state.song}
                  ref="uploadFile"
                />
                <Countries list={this.state.listCountry} ref="countries"/>
                <cm.RaisedButton
                  primary={true}
                  labelPosition="after"
                  label="Submit"
                  className="submit-upload"
                  onTouchTap={this.handleSubmitForm}
                  title="Submit" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          noi quy
        </div>
      </div>
    )
  }
}
