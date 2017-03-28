export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setToolBar("Subject");
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
          <h1>Hot</h1>
        </div>
        <div className="col-md-3">
          <h1>other</h1>
        </div>
      </div>
    )
  }
}
