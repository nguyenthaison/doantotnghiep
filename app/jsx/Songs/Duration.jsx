// import ReactInterval from "react-interval";

export default class Index extends PageComponent {
  constructor(props) {
    super(props);
  }

  renderCountDuration() {
    let currentPosition = this.props.position;
    let min = Math.floor(currentPosition / 60000);
    let second = Math.floor(currentPosition / 1000);
    let minPlaceholder = null;
    let secondPlaceholder = null;
    if (min < 10) {
      minPlaceholder = 0;
    }

    if (second < 10) {
      secondPlaceholder = 0;
    }

    return <span>{minPlaceholder}{min} : {secondPlaceholder}{second}</span>
  }

  renderDurationEstimate() {
    let duration = this.props.duration;
    let minuteEstimate = Math.floor(duration / 60000);
    let secondEstimate = Math.floor(duration / 1000) - minuteEstimate * 60;
    let minPlaceholder = null;
    let secondPlaceholder = null;
    if (minuteEstimate < 10) {
      minPlaceholder = 0;
    }

    if (secondEstimate < 10) {
      secondPlaceholder = 0;
    }

    return <span>{minPlaceholder}{minuteEstimate} : {secondPlaceholder}{secondEstimate}</span>
  }

  render() {
    let durationEstimate = this.renderDurationEstimate();
    let countDuration = this.renderCountDuration();
    return (
      <div>
        {countDuration} | {durationEstimate}
      </div>
    )
  }
}
