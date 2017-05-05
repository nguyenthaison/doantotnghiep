import FavoriteArtist from "./FavoriteArtist";

export default class RightContent extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleViewSinger = (singer) => {
    Helper.transitionTo(`/artists/${singer.name}`, singer);
  }

  handleChangeFavorite = () => {
    this.props.onChange();
  }

  render() {
    const singers = this.props.singers;

    let image = "/images/p9.jpg"
    return (
      <div className="content">
        {singers.map((singer, index) => {
          return (
            <div className="singer" key={singer.id}>
              <ul>
                <li><p>{index + 1}</p></li>
                <li><mui.Avatar src={image} size={80} /></li>
                <li><a className="pointer" onClick={() => this.handleViewSinger(singer)} >
                  {singer.name}</a>
                </li>
                <li className="tool">
                  <FavoriteArtist artist={singer} articleType="singer"
                    favorite_articles={this.props.favorite_articles}
                    onChange={this.handleChangeFavorite}
                    favorite={singer.total_favorites}
                  />
                </li>
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}
