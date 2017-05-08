import List from "./List";

const takeRecord = 20;

export default class ListDialog extends List {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }

    this.headerType = "secondary";
    this.noHeaderTitle = true;
  }

  isAuthorized() {
    return true;
  }

  componentDidMount() {
  }

  open = (data, additionData) => {
    this.parent = data || {};
    this.additionData = additionData;
    this.typingQuery = "";

    if (data.id) {
      this.setState({
        show: true,
      });
      this.getListMaster(this.take);
    }
  }

  close = () => {
    this.setState({
      show: false,
      list: null,
    });
  }

  handleClose = () => {
    this.close();
  }

  render() {
    return (
      <div>
        <cm.Dialog
          title={this.parent ? this.parent.name : ""}
          className="base-master-dialog-index"
          contentClassName="dialog-content"
          onRequestClose={this.handleClose}
          open={this.state.show}

        >
            {super.render()}
        </cm.Dialog>
      </div>
    );
  }
}
