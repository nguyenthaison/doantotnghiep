import Checkbox from "material-ui/Checkbox";

export default class MusicType extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkedMusicTypes: [],
    }
  }

  getCheckedMusicTypes() {
    return this.state.checkedMusicTypes;
  }

  handleCheckMusicType = (item) => {
    let checkedMusicTypes = this.state.checkedMusicTypes;
    let index = checkedMusicTypes.findIndex(checkedMusicType => checkedMusicType.id === item.id);
    if (index != -1) {
      checkedMusicTypes.splice(index, 1);
    } else {
      checkedMusicTypes.push(item.id);
    }
    this.setState({
      checkedMusicTypes: checkedMusicTypes,
    });
  }

  render() {
    return (
      <div>
        {this.props.musicTypes.map((item, index) => {
          return (
            <div key={index}>
              <Checkbox
                label={item.name}
                onClick={() => this.handleCheckMusicType(item)}
              />
            </div>
          )
        })}
      </div>
    )
  }
}
