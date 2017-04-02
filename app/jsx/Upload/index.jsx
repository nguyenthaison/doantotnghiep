import Uploader from "./Uploader";
import Checkbox from 'material-ui/Checkbox';

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listCountry: [],
      name: "",
      nameSinger: "",
      content: "",
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

  handleSaveCallback = (song) => {

  }

  // handleChangeInputField = (fieldName, value) => {
  //   let newState = update(this.state, {[fieldName]: {$set: value}});
  //   this.setState(newState);
  // }

  handleChangeInputNameSong = (fieldName, value) => {
    let newState = update(this.state.name, {$set: value});
    this.setState({name: newState});
  }

  handleChangeInputNameSinger = (fieldName, value) => {
    let newState = update(this.state.nameSinger, {$set: value});
    this.setState({nameSinger: newState});
  }

  handleChangeInputLyric = (fieldName, value) => {
    let newState = update(this.state.content, {$set: value});
    this.setState({content: newState});
  }

  hanldeClickShowMusicType = (country) => {
    this.setState({
      country: country,
    });
  }

  renderCountry() {
    return this.state.listCountry.map((item, index) => {
      return (
        <div key={index}>
          <span onClick={() => this.hanldeClickShowMusicType(item)}>
            {item.full_name}
          </span>
        </div>
      )
    })
  }

renderMusicType() {
  let country = this.state.country;
  if (!country) return;

  return country.music_types.map((item, index) => {
    return (
      <div key={index}>
        <Checkbox
          label={item.name}
        />
      </div>
    )
  })
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
                  value={this.state.name}
                  onChange={(event, value) => this.handleChangeInputNameSong("name", value)}
                />

                <cm.TextField
                  name="singer"
                  fullWidth={true}
                  fieldName="singer"
                  value={this.state.nameSinger}
                  onChange={(event, value) => this.handleChangeInputNameSinger("name", value)}
                />

                <cm.TextField
                  name="lyric"
                  fullWidth={true}
                  fieldName="lyric"
                  value={this.state.content}
                  onChange={(event, value) => this.handleChangeInputLyric("content", value)}
                />
                <Uploader
                  onChange={() => this.handleSaveCallback()}
                />
                {this.renderCountry()}
                {this.state.country ? this.renderMusicType() : ""}
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
