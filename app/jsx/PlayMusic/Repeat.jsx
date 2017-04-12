import Repeat from "material-ui/svg-icons/av/repeat";
import RepeatOne from "material-ui/svg-icons/av/repeat-one";
import Shuffle from "material-ui/svg-icons/av/shuffle";
import TimerOff from "material-ui/svg-icons/image/timer-off";

export default class Index extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleChangeRepeat = (repeat) => {
    let repeatChange = "";
    let oneSong = this.props.oneSong;
    if (oneSong) {
      repeatChange = repeat == "one" ? "off" : "one";
    } else {
      if (repeat === true) return repeatChange = false;
      repeatChange = repeat == "one" ? "off" : (repeat == "repeat" ? "one" : "repeat");
    }
    this.props.onChange(repeatChange);
  }

  render() {
    let repeat = this.props.repeat;
    let shuffle = this.props.shuffle;
    let oneSong = this.props.oneSong;
    let icon = null;
    if (oneSong) {
      icon = repeat == "one" ? <RepeatOne /> : <TimerOff />;
    } else {
      icon = repeat == "one" ? <RepeatOne /> : (repeat == "repeat" ? <Repeat /> : <TimerOff />);
    }

    return (
      <div className="col-md-2 row">
        <div className="col-md-6">
          <cm.RaisedButton
            icon={icon}
            className="button-repeat background-button"
            primary={true}
            onClick={() => this.handleChangeRepeat(repeat)}/>
        </div>
        {oneSong ? null :
          <div className="col-md-6">
            <cm.RaisedButton
              icon={<Shuffle />}
              className="button-shuffle background-button"
              primary={true}
              onClick={() => this.handleChangeRepeat(shuffle)}/>
          </div>}
      </div>
    )
  }
}
