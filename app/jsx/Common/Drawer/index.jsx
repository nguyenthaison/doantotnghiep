export default class Drawer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  open = () => {
    this.setState({
      open: true,
    });
  }

  close = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    let filteredProps = {};
    let extendedProps = ["className"];
    Object.keys(this.props).map((k) => {
      if (extendedProps.indexOf(k) < 0) {
        filteredProps[k] = this.props[k];
      }
    });

    return (
      <mui.Drawer
        className={`common-drawer ${this.props.className}`}
        containerClassName="drawer-container"
        open={this.state.open}
        width={300}
        openSecondary={true}
        docked={false}
        onRequestChange={(open) => this.setState({open})}
        {...filteredProps}
      />
    );
  }
}
