import MusicType from "./MusicType";
// import Country from "./Country";

export default class Countries extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      country: null,
      data: {

      }
    }
  }

  getCheckedMusicTypes() {
    let test = this.refs.musicTypes.getCheckedMusicTypes();
    if (!this.refs.musicTypes) return;
    return this.refs.musicTypes.getCheckedMusicTypes();
  }

  hanldeSelectCountry = (country) => {
    this.setState({
      country: country,
    })
  }

  renderCountry() {
    return this.props.list.map((item, index) => {
      return (
        <li key={index}>
          <ul>
            <li className="image-flag-country">
              <img src="images/vietnam-flag.png" />
            </li>
            <li>
              <span onClick={() => this.hanldeSelectCountry(item)}>
                {item.full_name}
              </span>
            </li>
          </ul>

        </li>
      )
    })
  }

  render() {
    let country = this.state.country;

    return (
      <div className="list-country">
        {this.renderCountry()}
        {country ? <MusicType
          musicTypes={country.music_types}
          ref="musicTypes"
          /> : ""}
      </div>
    )
  }
}
