import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
} from "reactstrap";
import { IMAGE_BASE_URL } from "../config";

const MovieCard = ({ movie }) => {
  return (
    <>
      {movie && (
        <Link to={`/movie/${movie.id}`}>
          <Card className='mt-2 movie-card'>
            <CardImg
              top
              width='100%'
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt='Card image cap'
            />
            <CardBody className='image-card-body'>
              <CardTitle tag='h5' className='mb-0 pb-0'>
                {movie.title}
              </CardTitle>
            </CardBody>
            <div className='movie-class'>
              {movie.adult ? (
                <Badge color='info'>Adult</Badge>
              ) : (
                <Badge color='danger p-1'>HD</Badge>
              )}
            </div>
          </Card>
        </Link>
      )}
    </>
  );
};

export default MovieCard;
