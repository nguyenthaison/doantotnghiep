export default class ProgressBar extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // progress(completed) {
  //   if (completed > 100) {
  //     this.setState({completed: 100});
  //   } else {
  //     this.setState({completed});
  //     const diff = Math.random() * 10;
  //     this.timer = setTimeout(() => this.progress(completed + diff), 1000);
  //   }
  // }

  render() {
    return (
      <LinearProgress mode="determinate" value={this.props.completed} />
    )
  }
}
