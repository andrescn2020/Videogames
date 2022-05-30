import { Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import LandingPage from './components/LandingPage/LandingPage';
import Home from "./components/Home/Home";
import './App.css';
import Form from "./components/Form/Form";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";

const App = () => {

  return (

    <div>

        <Switch>

          <Route path="/" exact component={LandingPage} />
          <Route path="/api/videogames/" exact component={Home} />
          <Route path="/api/videogame/" exact component={Form} />
          <Route path="/api/videogame/:id" exact component={VideogameDetail} />
          <Route path="*" exact={true} component={NotFound} />

        </Switch>

    </div>
    
  );

}

export default App;
