import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../../config";
import "./movie.css";

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
      <div className='bar'>
        <div className='mt-3 text-light card bg-info text-center '>
          <h3>Movie Detail</h3>
        </div>
      </div>
      {movie && (
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: "1px",
            }}>
            <img
              src={`${IMAGE_BASE_URL}/${movie.backdrop_path}`}
              style={{ height: "50vh", borderRadius: "10px" }}
              alt='poster'
            />
          </div>
          <div className='info'>
            <img
              src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
              style={{
                height: "25vh",
                margin: "10px 10px",
                borderRadius: "10px",
              }}
              alt='poster'
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className='infotext'>
                <h4>Title: </h4>
                <h6
                  style={{
                    marginTop: "6px",
                    marginLeft: "85px",
                  }}>
                  {movie.title}
                </h6>
              </div>
              <div className='infotext'>
                <h4>Overview: </h4>
                <h6
                  style={{
                    marginTop: "6px",
                    marginLeft: "20px",
                    fontSize: "13px",
                    textAlign: "justify",
                  }}>
                  {movie.overview}
                </h6>
              </div>
              <div className='infotext'>
                <h4>Geners: </h4>
                <h6
                  style={{
                    marginTop: "6px",
                    marginLeft: "40px",
                  }}>
                  {movie.genres.map((item) => (
                    <div>{item.name}</div>
                  ))}
                </h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
