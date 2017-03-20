// import {Analyser, Song, Sequencer, Sampler, Synth} from "react-music"
// import Visualization from "./Visualization";
// import Polysynth from './Polysynth';
import Sound from "react-sound";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import Pause from "material-ui/svg-icons/av/pause";
import LinearProgress from 'material-ui/LinearProgress';
import ProgressBar from "./ProgressBar";

export default class Songs extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      playing: true,
      position: 0,
    }
  }

  handleAudioProcess  = (analyser) => {
    this.visualization.audioProcess(analyser);
  }

  toggleLightMode(){
    this.setState({lightMode: !this.state.lightMode});
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
    // console.log(`${event.position / event.duration * 100}%`);
    console.log(event.position / event.duration * 100);
    this.completed = event.position / event.duration * 100;
    // console.log(event.duration);
  }

  handleSongLoading = (bytesLoaded, bytesTotal) => {
    // console.log(`${bytesLoaded / bytesTotal * 100}% loaded`);
  }

  handleSongFinishedPlaying = () => {
    this.setState({
      position: 0,
    });
  }

  render() {
    let position = this.state.position;

    return (
      <div className="base-master-index">
        <div className="display">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-7">
              <ProgressBar ref="progressBar" completed={this.completed} />
            </div>
            <div className="col-md-5">
            </div>
          </div>
        </div>
        <div>
          <Sound
            url="samples/test.mp3"
            playStatus={this.state.playing ? Sound.status.PLAYING : Sound.status.PAUSED}
            playFromPosition={300 /* in milliseconds */}
            volume={80}
            onLoading={({bytesLoaded, bytesTotal}) => this.handleSongLoading()}
            onPlaying={(event) => this.handleSongPlaying(event)}
            onFinishedPlaying={this.handleSongFinishedPlaying} />
          <cm.RaisedButton
            icon={this.state.playing ? <Pause /> : <PlayArrow />}
            className="music-button"
            label="Play"
            primary={true}
            onClick={this.handlePlayMusic}/>
        </div>
      </div>
    );
  }
}
