import { Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import LandingPage from './components/LandingPage/LandingPage';
import Home from "./components/Home/Home";
import './App.css';
import Form from "./components/Form/Form";

const App = () => {

  return (
    <div>

      <h1>

        <Switch>

          <Route path="/" exact component={LandingPage} />
          <Route path="/api/videogames/" exact component={Home} />
          <Route path="/api/videogame/" exact component={Form} />
          <Route path="*" exact={true} component={NotFound} />

        </Switch>

      </h1>

    </div>
  );

}

export default App;
