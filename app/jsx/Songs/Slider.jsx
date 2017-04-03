import Slider from 'material-ui/Slider';

export default class Index extends PageComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Slider
        defaultValue={0}
        value={this.props.completed}
        min={-1}
        max={101} />
    )
  }
}
