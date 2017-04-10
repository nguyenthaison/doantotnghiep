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
      <div className="col-md-4">
        <div className="row">
          <div className="col-md-2 col-lg-2 col-sm- col-xs-12">
            <div className="row">
              <cm.RaisedButton
              icon={icon}
              className="button-volume background-button"
              primary={true}
              onClick={this.handleClickBtnVolume}/>
            </div>
          </div>
          <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12">
            <div className="row">
              <Slider min={0}
              className="slider-volume"
              max={100}
              onChange={this.handleSliderChangeVolume}
              value={this.props.volume} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
