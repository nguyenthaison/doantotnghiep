import Sound from "react-sound";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import Pause from "material-ui/svg-icons/av/pause";
// import VolumeDown from "material-ui/svg-icons/av/volume-down";
// import VolumeOff from "material-ui/svg-icons/av/volume-off";
// import VolumeUp from "material-ui/svg-icons/av/volume-up";
import SkipNext from "material-ui/svg-icons/av/skip-next";
import Slider from 'material-ui/Slider';
// import PlayerControls from './PlayerControls';
import Volume from './Volume';

export default class Songs extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      playing: true,
      position: 0,
      completed: 0,
      volume: 80,
      preVolume: 0,
      statusVolume: true,
    }
  }

  // componentDidMount() {
  //   API.Song.getList(this.handleCallbackList)
  // }

  // handleCallbackList = (status, data) => {
  //   if (!status) return;
  //   this.setState({
  //     list: data
  //   })
  // }

  handlePlayMusic = () => {
    this.setState({
      playing: !this.state.playing,
    });
  }

  handleSongPlaying = (event) => {
    let completed = event.position / event.duration * 100;
    this.setState({
      completed: completed,
      position: event.position,
    });
  }

  // handleSongLoading = (bytesLoaded, bytesTotal) => {
  // }

  handleSongFinishedPlaying = () => {
    this.setState({
      position: 0,
    });
  }

  handleChangeSlider = (event, value) => {
    this.setState({
      position: value,
    });
  }

  handleNextMusic = () => {

  }

  handleBtnChangeVolume = (boolean) => {
    this.setState({
      preVolume: this.state.volume,
      statusVolume: boolean,
      volume: boolean ? this.state.preVolume : 0,
    });
  }

  handleSliderChange = (volume) => {
    this.setState({
      volume: volume,
      preVolume: volume === 0 ? 10 : volume,
      statusVolume: volume === 0 ? false : true,
    });
  }

  render() {
    return (
      <div className="base-master-index">
        <div className="display">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-7">
              <Slider
                value={this.state.completed}
                min={0}
                max={100}
                onChange={this.handleChangeSlider} />
            </div>
            <div className="col-md-5">
            </div>
          </div>
        </div>
        <div className="button-control">
          <Sound
            url="samples/test.mp3"
            playStatus={this.state.playing ? Sound.status.PLAYING : Sound.status.PAUSED}
            position={this.state.position}
            volume={this.state.volume}
            // onLoading={({bytesLoaded, bytesTotal}) => this.handleSongLoading()}
            onPlaying={(event) => this.handleSongPlaying(event)}
            onFinishedPlaying={this.handleSongFinishedPlaying} />
          <cm.RaisedButton
            icon={this.state.playing ? <Pause /> : <PlayArrow />}
            className="button-play"
            primary={true}
            onClick={this.handlePlayMusic}/>
          <cm.RaisedButton
            icon={<SkipNext />}
            className="skip-next"
            primary={true}
            onClick={this.handleNextMusic}/>
          <Volume btnChange={this.handleBtnChangeVolume}
            sliderChange={this.handleSliderChange}
            volume={this.state.volume}
            statusVolume={this.state.statusVolume}
            />
        </div>
      </div>
    );
  }
}
