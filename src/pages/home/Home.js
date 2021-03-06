import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../config";
import MovieCard from "../../components/MovieCard";
import ImageCarousel from "../../components/Carousel";
import "./home.css";

const Home = () => {
  const [trendings, setTrendings] = React.useState([]);
  const [playingNow, setPlayingNow] = React.useState([]);
  const [playingTv, setTv] = React.useState([]);

  React.useEffect(() => {
    getTrendingMovies();
    getPlayingNowMovies();
    getTv();
  }, []);

  const getTrendingMovies = async () => {
    const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY },
    });
    setTrendings(res.data.results.splice(0, 12));
  };

  const getPlayingNowMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: { api_key: API_KEY },
    });
    setPlayingNow(res.data.results.splice(0, 6));
  };
  const getTv = async () => {
    const res = await axios.get(`${BASE_URL}/tv/popular`, {
      params: { api_key: API_KEY },
    });
    setTv(res.data.results.splice(0, 6));
  };
  return (
    <div>
      <div className='movie_carousel'>
        <ImageCarousel movies={playingNow} />
      </div>
      <div className='mt-2 text-light card bg-info p-2'>
        <div className='sub-header'>
          <h3>Now Playing</h3>
          <Link to='/movies/1' className='sub-header-link'>
            View More
          </Link>
        </div>
      </div>
      <div className='row'>
        {playingNow.map((movie, index) => {
          return (
            <div className='col-md-2' key={index}>
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>

      <div className='mt-4 text-light card bg-info p-2'>
        <h3>Trading Now</h3>
      </div>
      <div className='row'>
        {trendings.map((movie, index) => {
          return (
            <div className='col-md-2' key={index}>
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>

      <div className='mt-2 text-light card bg-info p-2'>
        <div className='sub-header'>
          <h3>Web Series</h3>
        </div>
      </div>
      <div className='row'>
        {playingTv.map((tv, index) => {
          return (
            <div className='col-md-2' key={index}>
              <MovieCard movie={tv} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
