import Checkbox from "material-ui/Checkbox";

export default class MusicType extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        country: this.props.country,
        checkedMusicTypes: [],
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.country.id !== this.props.country.id) {
      let newData = update(this.state.data, {country: {$set: nextProps.country}, checkedMusicTypes: {$set: []}})
      this.setState({
        data: newData,
      })
    }
  }

  getCheckedMusicTypes() {
    return this.state.data;
  }

  handleCheckMusicType = (item) => {
    let checkedMusicTypes = this.state.data.checkedMusicTypes;
    let index = checkedMusicTypes.findIndex(checkedMusicType => checkedMusicType === item.id);
    if (index === -1) {
      checkedMusicTypes.push(item.id);
    } else {
      checkedMusicTypes.splice(index, 1);
    }

    let newData = update(this.state.data, {checkedMusicTypes: {$set: checkedMusicTypes}});
    this.setState({
      data: newData,
    });
  }

  render() {
    return (
      <div>
        {this.props.musicTypes.map((item, index) => {
          let isCheck = this.state.data.checkedMusicTypes.findIndex((musicType) => musicType === item.id);
          return (
            <div key={index}>
              <Checkbox
                label={item.name}
                onClick={() => this.handleCheckMusicType(item)}
                checked={isCheck === -1 ? false : true}
              />
            </div>
          )
        })}
      </div>
    )
  }
}
