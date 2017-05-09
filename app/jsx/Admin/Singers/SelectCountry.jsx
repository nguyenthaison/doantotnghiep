import Select from "react-select";
import Creatable from 'react-select';

export default class SelectCountry extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      selectedCountry: this.props.selectedCountry || null,
    }
  }

  getSelectedCountry() {
    return this.state.selectedCountry;
  }

  handleChange = (event, index, value) => {
    this.setState({
      selectedCountry: value,
    })
  }

  renderMenuItem() {
    let menuItems = this.props.countries.map((country) => {
      return <mui.MenuItem key={country.id} value={country.id} primaryText={country.full_name} />
    });
    return menuItems;
  }

  render() {
    return (
      <mui.SelectField
        floatingLabelText="Country"
        value={this.state.selectedCountry}
        onChange={this.handleChange}
        className="select-country"
      >
        {this.renderMenuItem()}
      </mui.SelectField>
    )
  }
}
