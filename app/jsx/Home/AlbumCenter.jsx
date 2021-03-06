const TAKE_RECORD = 12;

export default class AlbumCenter extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    API.Album.getList(this.handleGetListVnCallback, this.getOption("vn"));
  }

  getOption(type) {
    return {
      order_by: "view desc",
      filter: {creator: "member"},
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
    Helper.transitionTo("/album", item.id);
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
          </div>
        )
      })}
      </div>
    )
  }
}
