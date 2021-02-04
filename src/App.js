import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import NavBar from "./components/NavBar";
import Movie from "./pages/movie/Movie";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='container-fluid'>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* List of movies */}
          <Route
            exact
            path='/movies/:id'
            render={(data) => {
              return <Movies data={data} />;
            }}
          />
          {/* Single movie */}
          <Route
            exact
            path='/movie/:id'
            render={(data) => {
              return <Movie data={data} />;
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
