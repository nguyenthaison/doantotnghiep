import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import CreatePlayList from "./CreatePlayList";

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

export default class Popover extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      playListSong: [],
      song: {},
    }
  }

  open = (data) => {
    this.setState({
      open: true,
      anchorEl: data.currentTarget,
      song: data.song,
    })
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCheckFavorite = (song, playList, index) => {
    if (index === -1) {
      let play_list_song = {};
      play_list_song["play_list_id"] = playList.id;
      play_list_song["song_id"] = song.id;
      API.PlayListSong.create(this.handleAction, play_list_song);
    } else {
      API.PlayListSong.delete(this.handleAction, playList.play_list_songs[index].id);
    }
  }

  handleAction = (status, data) => {
    if (!status) return;
    this.props.onEventListener();
  }

  handleCreatePlayList = () => {
    this.props.onEventListener();
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const playLists = this.props.playLists;
    const song = this.state.song;
    console.log(this._isMounted);

    return (
      <mui.Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
        className="popup-add-wishlist"
      >
        <div className="popup-title">Add to Playlist</div>
        {playLists.map((item) => {
          let index = item.play_list_songs.findIndex((play_list_song) => song.id === play_list_song.song_id)

          return (
            <mui.Checkbox
              key={item.id}
              checkedIcon={item.play_list_type === "Favorite" ? <ActionFavorite /> : null}
              uncheckedIcon={item.play_list_type === "Favorite" ? <ActionFavoriteBorder /> : null}
              label={item.name}
              checked={index === -1 ? false : true}
              style={styles.checkbox}
              onCheck={() => this.handleCheckFavorite(song, item, index)}
              className="item-popup"
            />
          )
        })}
        <CreatePlayList 
          onCreate={this.handleCreatePlayList} 
        />
      </mui.Popover>
    )
  }
}
