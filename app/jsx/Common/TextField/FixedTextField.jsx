// This f*king stupid class is used to fix a f*king stupid bug of material-ui TextField
// I'll remove it when material-ui fixes this f*king bug
export default class FixedTextField extends mui.TextField {
  handleInputChange = (event) => {
    if (this.props.onChange) this.props.onChange(event, event.target.value);
  }
}
