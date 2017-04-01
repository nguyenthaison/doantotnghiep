import Uploader from "./Uploader";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      listCountry: [],
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
      listCountry: data.list,
    });
  }

  handleSaveCallback = (song) => {
    console.log(song);
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
                />

                <cm.TextField
                  name="singer"
                  fullWidth={true}
                  fieldName="singer"
                />

                <cm.TextField
                  name="lyric"
                  fullWidth={true}
                  fieldName="lyric"
                />

                <Uploader
                  onChange={() => this.handleSaveCallback()}
                />
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
