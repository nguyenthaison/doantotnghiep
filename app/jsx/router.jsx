import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

import App from "./App";
import Home from "./Home";
// import Songs from "./Songs";
// import Song from "./Songs/Song";
import PlayMusic from "./PlayMusic/Song";
import Albums from "./Albums";
import AlbumDetail from "./Albums/AlbumDetail";
import Subjects from "./Subjects";
import Ranks from "./Ranks";
import Singers from "./Singers";
import Upload from "./Upload";
import Login from "./Login";
import Song from "./OneMusic";
import Personal from "./Personal";
import PlayListDetail from "./Personal/PlayListDetail";

const router = (
  <Router history={browserHistory}>
    <Route path="users/sign_in" component={Login} />
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>

      {/*<Route path="songs" component={Songs} />*/}
      {/*<Route path="song" component={Song} />*/}
      <Route path="play" component={PlayMusic} />

      <Route path="albums" component={Albums} />
      <Route path="album" component={AlbumDetail} />

      <Route path="song" component={Song} />

      <Route path="subjects" component={Subjects} />

      <Route path="ranks" component={Ranks} />

      <Route path="singers" component={Singers} />

      <Route path="personal" component={Personal} />
      <Route path="personal/PlayListDetail" component={PlayListDetail} />

      <Route path="upload" component={Upload} />
    </Route>
  </Router>
);

export default router;
