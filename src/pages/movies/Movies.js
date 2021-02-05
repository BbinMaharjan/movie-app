import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../config";
import MovieCard from "../../components/MovieCard";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Movies = ({ data }) => {
  const { match } = data;
  const [currentPage, setCurrentPage] = useState(1);
  const [playingNow, setPlayingNow] = useState([]);

  useEffect(() => {
    setCurrentPage(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    const getPlayingNowMovies = async (cp) => {
      const res = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: { api_key: API_KEY, page: cp },
      });
      setPlayingNow(res.data.results.splice(0, 18));
    };
    match.params.id && getPlayingNowMovies(currentPage);
  }, [currentPage, match.params.id]);

  return (
    <div>
      <div className='mt-3 text-light card bg-info text-center '>
        <div className='da'>
          <h3>All Movies</h3>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexFlow: "wrap",
        }}>
        {playingNow?.map((item) => (
          <div className='col-md-2'>
            <MovieCard movie={item} />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}>
        <Pagination aria-label='Page navigation example'>
          <PaginationItem>
            <PaginationLink first href={`/movies/1`} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous href={`/movies/${match.params.id - 1}`} />
          </PaginationItem>
          {[1, 2, 3, 4, 5].map((item) => (
            <PaginationItem>
              <PaginationLink first href={`/movies/${item}`}>
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              next
              href={`/movies/${Number(match.params.id) + 1}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last href={`/movies/100`} />
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
};

export default Movies;
