import Uploader from "./Uploader";
import Countries from "./Countries";
import Singer from "./Singer";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listCountry: [],
      listSinger: [],
      song: {
        name: "",
        // singer_name: "",
        content: "",
        dataSource: [],
      },
      checkedMusicTypes: [],
      country: null,
    }
  }

  componentDidMount() {
    API.Country.getList(this.handleGetListCountry, this.getOption());
    API.Singer.getList(this.handleGetListSinger);
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

  handleGetListSinger = (status, data) => {
    if (!status) return;
    this.setState({
      listSinger: data.singers,
    });
  }

  handleChangeInputText = (fieldName, value) => {
    let newState = update(this.state.song, {[fieldName]: {$set: value}});
    this.setState({song: newState});
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
    let song = this.state.song;
    let data = new FormData();
    let attachment = this.refs.uploadFile.getAttachment();
    let musicTypeIds = this.refs.countries.getCheckedMusicTypes();
    let singers = this.refs.singers.getSingers();
    data.append("attachment", attachment);
    data.append("name", song.name);
    data.append("singer_name", JSON.stringify(singers));
    data.append("lyric_content", song.content);
    data.append("music_type_song_ids", JSON.stringify(musicTypeIds));
    API.Song.create(this.handleSubmitCallback, data);
  }

  render() {
    let imageUpload = "images/upload.png";

    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="col-md-9 col-lg-9 col-sm-9 col-xs-12">
          <div className="row">
            <div className="box-upload">
              <div className="col-md-3 col-lg-3 col-sm-3 col-xs-12">
                <div className="row">
                  <div className="border-image-upload">
                    <img src={imageUpload} className="image-upload"/>
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-lg-9 col-sm-9 col-xs-12">
                <cm.TextField
                  name="name-song"
                  fullWidth={true}
                  fieldName="name"
                  value={this.state.song.name}
                  onChange={(event, value) => this.handleChangeInputText("name", value)}
                />
                <label className="singers">Singer</label>
                <Singer singers={this.state.listSinger} ref="singers" />
                <cm.TextField
                  name="lyric"
                  fullWidth={true}
                  fieldName="lyric"
                  value={this.state.song.content}
                  multiLine={true}
                  onChange={(event, value) => this.handleChangeInputText("content", value)}
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
        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-12">
          <div className="row">
            <h3>Content banned upload:</h3>
            <p>- Nội dung liên quan đến chính trị, trái thuần phong mỹ tục</p>

            <p>- Nội dung đã thuộc sở hữu của bên thứ ba, được quy định rõ ở đây.</p>
            <p>- Nội dung đã được phát hành trên Zing MP3.</p>
            <h3>Rules upload:</h3>
            <p>- Kích thước file nhạc tối đa là 60MB.</p>
            <p>- Mỗi tài khoản thường được phép upload tối đa 200 bài hát (không giới hạn đối với tài khoản VIP).</p>
            <p>- Tính năng upload sẽ bị khóa (tạm thời) nếu bạn cố tình vi phạm nhiều lần các quy định về nội dung cấm (đã nêu ở trên)</p>
          </div>
        </div>
      </div>
    )
  }
}
