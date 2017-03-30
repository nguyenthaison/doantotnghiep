import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

import App from "./App";
import Home from "./Home";
import Songs from "./Songs";
import Song from "./Songs/Song";
import Albums from "./Albums";
import Subjects from "./Subjects";
import Ranks from "./Ranks";

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="songs" component={Songs} />
      <Route path="song" component={Song} />
      <Route path="albums" component={Albums} />
      <Route path="subjects" component={Subjects} />
      <Route path="ranks" component={Ranks} />
    </Route>
  </Router>
);

export default router;
