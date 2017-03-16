export default class AlertDialog extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      title: "",
      content: "",
    }
  }

  open(title, content, onSubmit) {
    this.setState({
      open: true,
      title: title,
      content: content,
      onSubmit: onSubmit,
    })
  }

  handleClose = () => {
   let open = update(this.state.open, {$set: false});

    this.setState({
      open: open,
    })
  }

  handleSubmit = () => {
    this.state.onSubmit();
    this.handleClose();
  }

  render() {
    const actions = [
      <mui.FlatButton
        label={t("common.ok")}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <mui.Dialog
        title={this.state.title}
        onRequestClose={this.handleClose}
        open={this.state.open}
        actions={actions}
        modal={true}
        style={{zIndex: 10000}}
      >
        {this.state.content}
      </mui.Dialog>
    );
  }
}
