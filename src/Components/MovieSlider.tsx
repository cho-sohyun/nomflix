import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getMovies, IGetMoviesResult, IMovie } from '../api';
import { makeImagePath } from '../utils';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/slide.css';
import Modal from './Modal';

export interface MovieSliderProps {
  movies: IMovie[];
  onBoxClicked: (movieId: number) => void;
  title: string;
  movieCategory: string;
}

const SliderContainer = styled.section`
  padding: 40px 50px;
`;

const Slide = styled(motion.div)`
  margin-bottom: 100px;
  position: relative;
  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out;
  }
`;

const imgVariants = {
  normal: {
    scale: 1,
    zIndex: 0,
  },
  hover: {
    scale: 1.2,
    zIndex: 10,
    transition: {
      delay: 0.5,
      duration: 0.3,
      y: -10,
    },
  },
};

const infoVariants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
    },
  },
};

const MovieSlider: React.FC<MovieSliderProps> = ({ title, movieCategory }) => {
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', movieCategory], () => getMovies(movieCategory));

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleBoxClick = (movie: IMovie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <SliderContainer>
      <h4 className="slider-title">{title}</h4>
      <Slider {...settings}>
        {data?.results?.map((movie) => (
          <Slide
            layoutId={movie.id + ''}
            key={movie.id}
            whileHover="hover"
            initial="normal"
            variants={imgVariants}
            onClick={() => handleBoxClick(movie)}
            transition={{ type: 'tween' }}
            role="button"
          >
            <img src={makeImagePath(movie.backdrop_path, 'w500')} alt={movie.title} />
            <motion.div className="slider_info" variants={infoVariants}>
              <h4>{movie.title}</h4>
            </motion.div>
          </Slide>
        ))}
      </Slider>
      {selectedMovie && <Modal movie={selectedMovie} onClose={handleCloseModal} />}
    </SliderContainer>
  );
};
export default MovieSlider;
