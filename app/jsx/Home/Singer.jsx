import TmpSinger from "./TmpSinger";

export default class Singer extends PageComponent {
  constructor(props) {
    super(props);
  }

  renderListSinger() {
    let image = "/images/headphone.jpg";

    return TmpSinger.map((item, index) => {
      return (
        <div key={index}>
          <div><img src={image} /></div>
          <span>{item.name}</span>
        </div>
      )}
    )
  }

  render() {
    // return TmpSinger.map((item, index) => {
    //   return (
    //     <div key={index}>

    //     </div>
    //   )}
    // )
    return (
      <div>{this.renderListSinger()}</div>
    )
  }
}
