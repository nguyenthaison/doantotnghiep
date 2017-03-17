import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

// import Login from "./Login";
import App from "./App";
// import Index from "./App/IndexRoute"
import Home from "./Home";

const router = (
  <Router history={browserHistory}>
    {/*<Route path="users/sign_in" component={Login} />*/}
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home} />
    </Route>
  </Router>
);

export default router;
