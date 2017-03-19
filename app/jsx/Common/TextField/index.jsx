import FixedTextField from "./FixedTextField";

const style = {
  fontSize: "14px",
}

const inputStyle = {
  color: "#414141",
}

export default class TextField extends BaseComponent {
  static defaultProps = {
    value: "",
  }

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
    };
  }

  renderLabel = (fieldName, required = false) => {
    let requiredText = required ? <div className="required">{t("common.required")}</div> : "";

    return(
      <label className={"small-label " + (this.state.focus ? "focused" : "")}>
        {fieldName}
        {requiredText}
      </label>
    );
  }

  handleFocus = () => {
    this.setState({
      focus: true,
    });
  }

  handleBlur = () => {
    this.setState({
      focus: false,
    });
  }

  handleChangeText = (event, value) => {
    let typingText = value;

    if (typingText.length > this.props.maxLength) {
      typingText = typingText.substring(0, this.props.maxLength);
    }

    switch (this.props.filter) {
      case "halfsize":
        typingText = typingText.replace(/(?![\x20-\x7E])./g, "");
        break;
      case "alphanumberic":
        typingText = typingText.replace(/(?![a-zA-Z0-9])./g, "");
        break;
      case "phone_number":
        typingText = typingText.replace(/(?![\(\)\s0-9+.-])./g, "");
        break;
    }

    switch (this.props.transformation) {
      case "uppercase":
        typingText = typingText.toUpperCase();
        break;
      case "lowercase":
        typingText = typingText.toLowerCase();
        break;
    }

    this.props.onChange(event, typingText);
  }

  render() {
    let props = this.props;
    let filteredProps = {};
    let extendedProps = ["fieldName", "counting", "required", "filter", "transformation", "maxLength"];
    Object.keys(props).map((k) => {
      if (extendedProps.indexOf(k) < 0) {
        filteredProps[k] = props[k];
      }
    });

    return (
      <div className="common-textfield">
        {this.props.fieldName ? this.renderLabel(props.fieldName, props.required) : null}
        <FixedTextField
          {...filteredProps}
          value={this.props.value}
          style={style}
          onChange={this.handleChangeText}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoComplete="new-password"
          inputStyle={inputStyle}
          underlineShow={!this.props.disabled}
        />
        <div className="text-count">
          {props.counting ?
            t(`common.text_field.remaining`,
              { count: (props.maxLength - this.props.value.length)}) : ""}
        </div>
      </div>
    );
  }
}
