import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

import App from "./App";
import Home from "./Home";
import Songs from "./Songs";
import Albums from "./Albums";
import Subjects from "./Subjects";
import Ranks from "./Ranks";

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="songs" component={Songs} />
      <Route path="albums" component={Albums} />
      <Route path="Subjects" component={Subjects} />
      <Route path="Ranks" component={Ranks} />
    </Route>
  </Router>
);

export default router;
