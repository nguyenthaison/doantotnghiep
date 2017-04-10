const TAKE_RECORD = 12;

export default class AlbumCenter extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    API.Album.getList(this.handleGetListVnCallback, this.getOption("vn"))
  }

  getOption(type) {
    let include = {
      songs: {},
      singers: {only: ["id", "name"]},
    };
    return {
      include: JSON.stringify(include),
      order_by: "created_at desc",
      take: TAKE_RECORD,
    }
  }

  handleGetListVnCallback = (status, data) => {
    if (!status) return;
    this.setState({
      list: data.albums,
    });
  }

  handleClickPlayAlbum = (item) => {
    Helper.transitionTo("/play", {songs: item.songs, singers: item.singers});
  }

  render() {
    let list = this.state.list;
    let image = "/images/p9.jpg";

    return (
      <div className="list-new-albumcenter">
      {
        list.map((item, index) => {
        return (
          <div key={index} className="col-lg-2 col-md-2 col-sm-3 col-xs-6">
            <div className="item">
            	<div className="border-image-album-item" onClick={() => this.handleClickPlayAlbum(item)}>
            		<div className="image-album-item-icon">
            			<div className="item-icon-button">
            				<a href="#">
	            				<i className="material-icons">play_circle_outline</i>
	            			</a>
            			</div>
            		</div>
            		<div className="image-album-item">
            			<a href="#">
            				<img src={image} alt="" />
            			</a>
            		</div>
            	</div>
            	<div className="border-title-album-item">
            		{item.name}
            	</div>
            </div>
            {/*<img src={image} />*/}

          </div>
        )
      })}
      </div>
    )
  }
}


{/*<mui.GridList cols={5.2}>
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
      </mui.GridList>*/}
