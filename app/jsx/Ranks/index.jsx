export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setToolBar("Top 40");
  }

  // componentWillReceiveProps(nextProps) {

  // }

  // get locationState() {
  //   return Helper.getCurrentLocationState();
  // }

  render() {
    return (
      <div className="top-page col-md-12">
        <div className="col-md-9 faq-com-list">
          <p>Viet Nam</p>
        </div>
        <div className="col-md-3">
          <p>other</p>
        </div>
      </div>
    )
  }
}
