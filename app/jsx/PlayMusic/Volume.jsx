import VolumeDown from "material-ui/svg-icons/av/volume-down";
import VolumeOff from "material-ui/svg-icons/av/volume-off";
import VolumeUp from "material-ui/svg-icons/av/volume-up";
import Slider from 'material-ui/Slider';

export default class Index extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleSliderChangeVolume = (event, value) => {
    this.props.sliderChange(value);
  }

  handleClickBtnVolume = () => {
    let volume = this.props.volume;
    if (volume !== 0) {
      this.props.btnChange(false);
    } else {
      this.props.btnChange(true)
    }
  }

  render() {
    let volume = this.props.volume;
    let icon = volume = 0 ? <VolumeOff /> : (volume > 50 ? <VolumeUp /> : <VolumeDown />)
    icon = this.props.statusVolume ? icon : <VolumeOff />

    return (
      <div className="contain-volume button-play-music">
        <div className="button-volume-contain">
          <cm.RaisedButton
          icon={icon}
          className="button-volume background-button"
          primary={true}
          onClick={this.handleClickBtnVolume}/>
        </div>
        <div className="slider-volume-contain">
          <Slider min={0}
          className="slider-volume"
          max={100}
          onChange={this.handleSliderChangeVolume}
          value={this.props.volume} />
        </div>
      </div>
    )
  }
}
