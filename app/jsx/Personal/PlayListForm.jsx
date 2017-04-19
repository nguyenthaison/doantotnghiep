export default class PlayListForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: {},
      errors: [],
    };
  }

  open = (data) => {
    this.setState({
      show: true,
      data: data,
      errors: [],
    });
  }

  close = () => {
    this.setState({
      show: false,
    });
  }

  getDataForSubmit() {
    return this.state.data;
  }

  handleClose = () => {
    this.close();
  }

  renderDialogContent() {
    return (
      <div>
        nguyen thaison
      </div>
    )
  }

  render() {
    return (
      <cm.Dialog
        // actions={this.renderButton()}
        onRequestClose={this.handleClose}
        open={this.state.show}
        dialogType="Create">
        <div className="base-master-form">
          {this.renderDialogContent()}
        </div>
      </cm.Dialog>
    )
  }
}
