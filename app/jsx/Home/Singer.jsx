import TmpSinger from "./TmpSinger";
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: "auto",
  },
};

export default class Singer extends PageComponent {
  constructor(props) {
    super(props);
  }

  // renderListSinger() {
  //   let image = "/images/headphone.jpg";

  //   return TmpSinger.map((item, index) => {
  //     return (
  //       <div key={index}>
  //         <div><img src={image} /></div>
  //         <span>{item.name}</span>
  //       </div>
  //     )}
  //   )
  // }

  render() {
    let image = "/images/headphone.jpg";

    return (
      <div style={styles.root}>
        <mui.GridList
          cols={2}
          cellHeight={200}
          padding={1}
          style={styles.gridList}
        >
          {TmpSinger.map((item, index) => (
            <mui.GridTile
              key={index}
              title={item.name}
              actionIcon={<mui.IconButton><StarBorder color="white" /></mui.IconButton>}
              actionPosition="left"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              cols={1}
              rows={4}
            >
              <img src={image} />
            </mui.GridTile>
          ))}
        </mui.GridList>
      </div>
    )
  }
}
      {/*<div>{this.renderListSinger()}</div>*/}
