export default class RaisedButton extends BaseComponent {
  constructor(props) {
    super(props);

    this.style = {
      height: "40px",
      lineHeight: "40px",
      boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px",
    }
  }

  handleClick = (e) => {
    e.stopPropagation();
    if (this.props.transitionTo) {
      Helper.transitionTo(this.props.transitionTo);
    } else {
      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }

  render() {
    let props = this.props;
    let filteredProps = {};
    let extendedProps = ["transitionTo"];

    Object.keys(this.props).map((k) => {
      if (extendedProps.indexOf(k) < 0) {
        filteredProps[k] = this.props[k];
      }
    });

    this.style = Object.assign(this.style, this.props.style);

    return (
      <mui.RaisedButton
        {...filteredProps}
        className={"common-raised-button " + this.props.className}
        style={this.style}
        onClick={(e) => this.handleClick(e)}
      />
    );
  }
}
