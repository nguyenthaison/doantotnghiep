import Sound from "react-sound";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import Pause from "material-ui/svg-icons/av/pause";
import SkipPrevious from "material-ui/svg-icons/av/skip-previous";
import SkipNext from "material-ui/svg-icons/av/skip-next";
import Slider from 'material-ui/Slider';
import Volume from './Volume';
import Repeat from './Repeat';
import Duration from './Duration';

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
      listRandom: [],
      duration: null,
    }
  }

  playingMusic(song) {
    this.setState({
      playing: true,
      song: song,
      repeat: "one",
      list: [],
      position: 0,
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

  handleFindSongInList = (list, song) => {
    let index = list.findIndex(_song => {
      return _song.id === song.id;
    });
    return index;
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
      duration: event.duration,
    });
  }

  handleSongFinishedPlaying = () => {
    let repeat = this.state.repeat;
    let shuffle = this.state.shuffle;
    let song = this.state.song;

    if (shuffle) {
      let listRandom = this.state.listRandom;
      let index = this.handleFindSongInList(listRandom, song);

      this.setState({
        song: index === listRandom.length -1 ? listRandom[0] : listRandom[index + 1],
        shuffle: true,
        position: 0,
      })
    } else {
      let list = this.state.list;

      if(repeat == "one"){
        this.setState({
          position: 0,
          repeat: "one",
        })
      } else if (repeat == "repeat") {
        let song = this.state.song;
        let index = this.handleFindSongInList(list, song);

        this.setState({
          song: index === list.length - 1 ? list[0] : list[index + 1],
          repeat: "repeat",
          position: 0,
        })
      } else {
        this.setState({
          song: {},
          position: 0,
        })
      }
    }
  }

  handleChangeSlider = (event, value) => {
    this.setState({
      position: value,
    });
  }

  handleChangeMusic = (next = true) => { //next or previous
    let song = this.state.song;
    let list = [];
    let index = null;
    if (this.state.shuffle) {
      list = this.state.listRandom;
      index = this.handleFindSongInList(list, song);
    } else {
      list = this.state.list;
      index = this.handleFindSongInList(list, song);
    }
    let newSong = index === list.length - 1 ? list[0] :
      (next ? list[index + 1] : list[index - 1]) // cuoi ds, next, previous

    this.setState({
      song: newSong,
      position: 0,
      playing: true,
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

  handleRandomList = () => {
    let list = this.state.list;
    let newList = update(list, {})
    let currentIndex = newList.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = newList[currentIndex];
      newList[currentIndex] = newList[randomIndex];
      newList[randomIndex] = temporaryValue;
    }
    return newList;
  }

  handleChangeRepeat = (repeat) => {
    let check = typeof(repeat) == "boolean"; // check shuffle or repeat
    if(check) { //check shuffle
      let listRandom = this.handleRandomList();
      this.setState({
        shuffle: repeat,
        listRandom: listRandom,
      });
    } else {
      this.setState({
        repeat: repeat,
      });
    }
  }

  renderButtonPlay(icon, className, handle) {
    return (
      <div className="col-md-1">
        <cm.RaisedButton
          icon={icon}
          className={className}
          primary={true}
          onClick={handle}/>
      </div>
    )
  }

  render() {
    let song = this.state.song;
    let repeat = this.state.repeat;
    let shuffle = this.state.shuffle;
    let playing = this.state.playing;
    let iconPlay = playing ? <Pause /> : <PlayArrow />;

    return (
      <div className="song-play">
        <div className="display">
          <div className="slider-music">
            <Slider
              value={this.state.completed}
              min={-1}
              max={101}
              onChange={this.handleChangeSlider} />
          </div>
        </div>
        <div className="button-control">
          <Sound
            // url="samples/test.mp3"
            url={song.url || ""}
            playStatus={playing ? Sound.status.PLAYING : Sound.status.PAUSED}
            position={this.state.position}
            volume={this.state.volume}
            // onLoading={({bytesLoaded, bytesTotal}) => this.handleSongLoading()}
            onPlaying={(event) => this.handleSongPlaying(event)}
            onFinishedPlaying={this.handleSongFinishedPlaying} />
          <div className="row">
            {this.renderButtonPlay(<SkipPrevious />, "skip-previous", () => this.handleChangeMusic(false))}
            {this.renderButtonPlay(iconPlay, "button-play", this.handlePlayMusic)}
            {this.renderButtonPlay(<SkipNext />, "skip-next", this.handleChangeMusic)}
            <div className="col-md-1"></div>
            <Volume btnChange={this.handleBtnChangeVolume}
              sliderChange={this.handleSliderChange}
              volume={this.state.volume}
              statusVolume={this.state.statusVolume}
              />
            <div className="col-md-2">
              <Duration duration={this.state.duration} position={this.state.position} />
            </div>
            <Repeat onChange={this.handleChangeRepeat}
              repeat={repeat}
              shuffle={shuffle} />
          </div>
        </div>
      </div>
    );
  }
}
