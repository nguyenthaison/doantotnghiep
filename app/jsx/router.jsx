import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

import App from "./App";
import Home from "./Home";
import Songs from "./Songs";

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="songs" component={Songs} />
    </Route>
  </Router>
);

export default router;
