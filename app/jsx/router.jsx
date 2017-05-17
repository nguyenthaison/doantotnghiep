import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

import App from "./App";
import Home from "./Home";
import PlayMusic from "./PlayMusic/Song";
import Albums from "./Albums";
import AlbumDetail from "./Albums/AlbumDetail";
import Artists from "./Artists";
import Subjects from "./Subjects";
import Ranks from "./Ranks";
import Singers from "./Artists/Singers";
import SingerDetail from "./Artists/Singers/SingerDetail";
import Upload from "./Upload";
import Login from "./Login";
import Song from "./OneMusic";
import Personal from "./Personal";
import PlayListDetail from "./Personal/TabPlayList/PlayListDetail";
import Admin from "./Admin";
import AdminUsers from "./Admin/Users";
import AdminAlbums from "./Admin/Albums";
import AdminSongs from "./Admin/Songs";
import AdminAuthors from "./Admin/Authors";
import AdminSingers from "./Admin/Singers";
import Songs from "./Songs";

const router = (
  <Router history={browserHistory}>
    <Route path="users/sign_in" component={Login} />
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home} />
      <Route path="play" component={PlayMusic} />

      <Route path="albums" component={Albums} />
      <Route path="album" component={AlbumDetail} />

      <Route path="search/songs" component={Songs} />
      <Route path="song" component={Song} />

      <Route path="subjects" component={Subjects} />

      <Route path="ranks" component={Ranks} />

      <Route path="artists" component={Artists} />
      <Route path="artists/:name" component={SingerDetail} />
      <Route path="singers" component={Singers} />

      <Route path="personal" component={Personal} />
      <Route path="personal/PlayListDetail" component={PlayListDetail} />

      <Route path="upload" component={Upload} />

      <Route path="admin" component={Admin} />
      <Route path="admin/users" component={AdminUsers} />
      <Route path="admin/songs" component={AdminSongs} />
      <Route path="admin/singers" component={AdminSingers} />
      <Route path="admin/authors" component={AdminAuthors} />
      <Route path="admin/albums" component={AdminAlbums} />
    </Route>
  </Router>
);

export default router;
