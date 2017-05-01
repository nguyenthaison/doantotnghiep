export default class index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      favoriteMusics: [],
    }
  }

  componentDidMount() {
    API.PlayList.getList(this.handleGetList, this.getOption());
  }

  getOption() {
    let include = {
      songs: {
        include: {
          singers: {only: ["id", "name"]},
        }
      },
    }

    return {
      include: JSON.stringify(include),
      filter: {user_id: App.auth.id, play_list_type: "Favorite"},
    }
  }

  handleGetList = (status, data) => {
    if (!status) return;
    this.setState({
      favoriteMusics: data.play_lists,
    })
  }

  render() {
    return (
      <div></div>
    )
  }
}
