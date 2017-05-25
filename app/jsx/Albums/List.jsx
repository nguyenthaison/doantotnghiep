export default class List extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleClickPlayAlbum = (item) => {
    Helper.transitionTo(`/albums/${item.id}`);
    // Helper.transitionTo("/album", item.id);
  }

  render() {
    let list = this.props.list;
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
                    <img src={image}/>
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
