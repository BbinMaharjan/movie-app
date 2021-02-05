import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../../config";

const Movie = ({ data }) => {
  const { match } = data;
  const [movieId, setMovieId] = useState(null);
  const [movie, setMovie] = useState(null);

  const getMovie = async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY },
    });
    setMovie(res.data);
  };

  useEffect(() => {
    match.params.id && setMovieId(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    movieId && getMovie(movieId);
  }, [movieId]);
  return (
    <div>
      {movie && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <div width='25%'>
            <img
              src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
              style={{ height: "70vh" }}
              alt='poster'
            />
          </div>
          <div width='60%'>
            <div>
              <b>Movie: </b>
              {movie.title}
            </div>
            <div>
              <b>Budget: </b>
              {movie.budget}
            </div>
            <div>
              <b>Overview: </b>
              {movie.overview}
            </div>
            <div>
              <b>Genres: </b>
              {movie.genres.map((item) => (
                <div>{item.name}</div>
              ))}
            </div>
            <div>
              <b>Popularity: </b>
              {movie.popularity}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
