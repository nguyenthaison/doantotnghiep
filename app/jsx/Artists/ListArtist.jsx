export default class ListArtist extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              <span className="pointer"><h1>ARTIST VIET NAM</h1></span>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="home-left">
                <span className="pointer"><h1>HOT ARTIST</h1></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
