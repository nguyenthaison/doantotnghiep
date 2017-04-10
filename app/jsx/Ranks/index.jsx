import Ranking from "./Ranking";
import Album from "./Album";

export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setToolBar("Top 10");
  }

  // componentWillReceiveProps(nextProps) {

  // }

  // get locationState() {
  //   return Helper.getCurrentLocationState();
  // }

  render() {
    return (
      <div className="home-page col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div className="home-center">
              <div className="bxh">
                <Ranking />
              </div>
              <div className="bxh">
                <Album />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="row">
              <div className="home-left">
                <p>reference</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
