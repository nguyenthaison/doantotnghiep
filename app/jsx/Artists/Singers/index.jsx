export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // componentDidMount() {
  //   this.setToolBar("Singer Detail");
  // }

  render() {
    return (
      <div className="top-page col-md-12">
        <div className="col-md-9 faq-com-list">
          <p>Singers</p>
        </div>
        <div className="col-md-3">
          <p>Other</p>
        </div>
      </div>
    )
  }
}
