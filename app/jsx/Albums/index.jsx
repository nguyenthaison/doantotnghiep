import Sound from "react-sound";
export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setToolBar("Album");
  }

  // componentWillReceiveProps(nextProps) {

  // }

  // get locationState() {
  //   return Helper.getCurrentLocationState();
  // }

  render() {
    return (
      <div className="top-page col-md-12">
        <Sound
          url="samples/Mo - Vu Cat Tuong.mp3"
          playStatus={Sound.status.PLAYING}
          position={0}
          volume={80}
          // onPlaying={(event) => this.handleSongPlaying(event)}
          // onFinishedPlaying={this.handleSongFinishedPlaying} />
          />
      </div>
    )
  }
}
