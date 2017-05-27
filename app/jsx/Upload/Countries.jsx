import MusicType from "./MusicType";

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
          country={this.state.country}
          ref="musicTypes"
          /> : ""}
      </div>
    )
  }
}
