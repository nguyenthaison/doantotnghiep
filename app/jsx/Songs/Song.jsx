import Sound from "react-sound";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import Pause from "material-ui/svg-icons/av/pause";
import SkipNext from "material-ui/svg-icons/av/skip-next";
import Slider from 'material-ui/Slider';
import Volume from './Volume';
import Repeat from './Repeat';

export default class Song extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      position: 0,
      completed: 0,
      volume: 80,
      preVolume: 0,
      statusVolume: true,
      repeat: "one", // one, Shuffle, repeat, off
      shuffle: false,
      song: {},
      list: [],
    }
  }

  playingMusic(song) {
    this.setState({
      playing: true,
      song: song,
      repeat: "one",
      list: [],
    });
  }

  playingListMusic(listSong) {
    this.setState({
      list: listSong,
      playing: true,
      repeat: "repeat",
      song: listSong[0],
    })
  }

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

  handleSongFinishedPlaying = () => {
    let repeat = this.state.repeat;
    let shuffle = this.state.shuffle;
    let list = this.state.list;
    let lenght = list.length

    if (this.state.shuffle) {
      let random = Math.floor((Math.random() * lenght) + 1);
      this.setState({
        song: list[random],
        shuffle: true,
      })
    } else {
      if(repeat == "one"){
        this.setState({
          position: 0,
          repeat: "one",
        })
      } else if (repeat == "repeat") {
        let song = this.state.song;
        let index = list.findIndex(_song => {
          return _song.id === song.id;
        });

        this.setState({
          repeat: "repeat",
          song: index === lenght ? list[0] : list[index + 1],
        })
      } else {
        this.setState({
          song: {},
        })
      }
    }
  }

  handleChangeSlider = (event, value) => {
    this.setState({
      position: value,
    });
  }

  handleNextMusic = () => {
    let song = this.state.song;
    let list = this.state.list;

    let index = list.findIndex(_song => {
      return _song.id === song.id;
    });

    this.setState({
      song: list[index + 1],
      position: 0,
    })
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

  handleChangeRepeat = (repeat) => {
    let check = typeof(repeat) == "boolean";
    if(check) {
      this.setState({
        shuffle: repeat,
      });
    } else {
      this.setState({
        repeat: repeat,
      });
    }
  }

  render() {
    let song = this.state.song;

    return (
      <div className="base-master-index">
        <div className="display">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-7">
              <Slider
                value={this.state.completed}
                min={-1}
                max={101}
                onChange={this.handleChangeSlider} />
            </div>
            <div className="col-md-5">
            </div>
          </div>
        </div>
        <div className="button-control">
          <Sound
            // url="samples/test.mp3"
            url={song.url || ""}
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
          <Repeat onChange={this.handleChangeRepeat}
            repeat={this.state.repeat}
            shuffle={this.state.shuffle} />
        </div>
      </div>
    );
  }
}
