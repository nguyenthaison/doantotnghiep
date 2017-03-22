import Repeat from "material-ui/svg-icons/av/repeat";
import RepeatOne from "material-ui/svg-icons/av/repeat-one";
// import Replay from "material-ui/svg-icons/av/replay";
import Shuffle from "material-ui/svg-icons/av/shuffle";

export default class Index extends PageComponent {
  constructor(props) {
    super(props);

    this
  }

  handleChangeRepeat = (repeat) => {
    let repeatChange = repeat == "one" ? "repeat" : (repeat == "repeat" ? "one" : !repeat);
    this.props.onChange(repeatChange);
  }

  render() {
    let repeat = this.props.repeat;
    let shuffle = this.props.shuffle
    let icon = repeat == "one" ? <RepeatOne /> : <Repeat />

    return (
      <div>
        <cm.RaisedButton
          icon={icon}
          className="button-repeat"
          primary={true}
          onClick={() => this.handleChangeRepeat(repeat)}/>
        <cm.RaisedButton
          icon={<Shuffle />}
          className="button-shuffle"
          primary={true}
          onClick={() => this.handleChangeRepeat(shuffle)}/>
      </div>
    )
  }
}
