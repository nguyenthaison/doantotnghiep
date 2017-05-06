import TabPlayList from "./TabPlayList";
import TabFavoriteMusic from "./TabFavoriteMusic";

const TAKE_RECORD = 10;

export default class index extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setToolBar("Personal Page");
  }

  handleActive = () => {

  }

  render() {
    return (
      <div className="my-page">
        <mui.Tabs>
          <mui.Tab label="My Play List" onActive={this.handleActive}>
            <div>
              <TabPlayList />
            </div>
          </mui.Tab>
          <mui.Tab label="My Favorite Song" onActive={this.handleActive}>
            <div>
              <TabFavoriteMusic />
            </div>
          </mui.Tab>
        </mui.Tabs>
      </div>
    )
  }
}
