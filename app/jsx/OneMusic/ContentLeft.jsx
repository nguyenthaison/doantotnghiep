const styles = {
  toggle: {
    marginBottom: 16,
  }
}

export default class ContentLeft extends PageComponent {
  constructor(props) {
    super(props);
  }

  handleToggle = () => {

  }

  handleClickPlayOne = (item) => {
    Helper.transitionTo("/song", item.id);
  }

  handleClickSingerInfo = (singer) => {
    Helper.transitionTo("/singers", singer);
  }

  renderSuggestContent() {
    const list = this.props.listRelated;

    if (!list) return null;
    return (
      <div className="suggest-content">
        <ul>
          {list.map(item =>
            {return (
              <li key={item.id}>
                <ul>
                  <li></li>
                  <li onClick={() => this.handleClickPlayOne(item)} title={item.name}
                    className="pointer">
                    {item.name}
                  </li>
                  <li>{this.renderSingers(item.singers)}</li>
                </ul>
              </li>
            )}
          )}
        </ul>
      </div>
    )
  }

  renderSingers(singers) {
    return (
      <div className="singer">
        {singers.map(singer => {
          return (
            <span key={singer.id} className="pointer" onClick={() => this.handleClickSingerInfo(singer)}
              title={singer.name}>
              {singer.name + " "}
            </span>
          )
        })}
      </div>
    )
  }

  render() {

    return (
      <div className="home-left">
        <mui.Toggle
          label="Suggest"
          labelStyle={styles.toggle}
          onToggle={this.handleToggle}
        />
        {this.renderSuggestContent()}
      </div>
    )
  }
}
