import {Analyser, Song, Sequencer, Sampler, Synth} from "react-music"
// import Visualization from 'react-music/visualization';

export default class Songs extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      error: "",
      playing: true,
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

  render() {
    return (
      <div className="base-master-index">
        <Song
          playing={this.state.playing}
          tempo={90}
        >
          <Analyser onAudioProcess={this.handleAudioProcess}>
            <Sequencer
              resolution={16}
              bars={1}
            >
              <Sampler
                sample="samples/test.mp3"
                steps={[2]}
              />
            </Sequencer>
          </Analyser>
        </Song>
        <Visualization ref={(event) => { this.visualization = event; }} />
        <cm.RaisedButton
          className="music-button"
          label="Play"
          primary={true}
          onClick={this.handlePlayMusic}
        />
      </div>
    );
  }
}
