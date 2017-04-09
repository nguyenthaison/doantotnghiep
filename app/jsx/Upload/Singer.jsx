import Select from "react-select";
import Creatable from 'react-select';

export default class Singer extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,
      singers: this.props.singers || [],
    }
  }

  getSingers() {
    return this.state.searchText;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        singers: nextProps.singers,
      })
    }
  }

  handleUpdateInput = (value) => {
    const newOptions = [].concat(this.state.singers);

    value.forEach(selection => {
      const match = this.props.singers.find(
        entry => (entry.value == selection.value));
      if (!match) {
        newOptions.add(match);
      }
    });

    this.setState({
      searchText: [].concat(value),
      singers: newOptions
    });
  }

  render() {
    return (
      <Select.Creatable
        name="form-field-name"
        value={this.state.searchText}
        options={this.state.singers}
        onChange={this.handleUpdateInput}
        multi={true}
        delimiter=","
        joinValues={true}
        valueKey="name"
        labelKey="name"
        allowCreate={true}
        matchPos="any"
        matchProp="value"
        ignoreAccents={false}
      />

    )
  }
}
