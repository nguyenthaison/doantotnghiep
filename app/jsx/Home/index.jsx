export default class Home extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setToolBar("Home");
  }

  // componentWillReceiveProps(nextProps) {

  // }

  // get locationState() {
  //   return Helper.getCurrentLocationState();
  // }

  render() {
    return (
      <div className="top-page col-md-12">
        <div className="col-md-9">
          <p>well come to homepage</p>
        </div>
        <div className="col-md-3">
          <p>reference</p>
        </div>
      </div>
    )
  }
}
