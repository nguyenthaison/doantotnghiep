import TmpSongs from "../Songs/TmpSongs";
import CommonRank from "./CommonRank";
// import IconButton from "material-ui/IconButton";
import StarBorder from "material-ui/svg-icons/toggle/star-border";

const TAKE_RECORD = 10;
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

export default class NewSong extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    API.Song.getList(this.handleGetListVnCallback, this.getOption("vn"))
  }

  getOption(type) {
    return {
      order_by: "created_at desc",
      take: TAKE_RECORD,
    }
  }

  handleGetListVnCallback = (status, data) => {
    if (!status) return;
    this.setState({
      list: data.songs,
    });
  }

  render() {
    let list = this.state.list;
    let image = "/images/p9.jpg";

    return (
      <mui.GridList cols={5.2}>
        {list.map((tile, index) => (
            <mui.GridTile
              key={index}
              title={tile.name}
              actionIcon={<mui.IconButton><StarBorder color="rgb(0, 188, 212)" /></mui.IconButton>}
              titleStyle={styles.titleStyle}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img src={image} />
            </mui.GridTile>
        ))}
      </mui.GridList>
    )
  }
}
