var React = require("react");
var Popular = require("./Popular");
const ReactRouter = require("react-router-dom");
const Switch = ReactRouter.Switch;
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
import Nav from "./Nav";
const Home = require("./Home");
const Battle = require("./Battle");
const Results = require('./Results');


class App extends React.Component {
  render() {
    return (
     <Router>
     	 <div className='container'>
     	 <Nav />
     	 <Switch>
     	 	<Route exact path="/" component={ Home } />
	     	<Route exact path="/battle" component={ Battle} />
        <Route path='/battle/results' component={Results} />
	   		<Route path="/popular" component={ Popular } />
	   		<Route render={function() {
	   			return <p>Not Found</p>}} />
	   		}
   		</Switch>
      </div>
     </Router>
    )
  }
}

module.exports = App;