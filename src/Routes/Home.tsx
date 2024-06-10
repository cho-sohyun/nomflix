import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieSlider from '../components/MovieSlider';
import Banner from '../components/Banner';

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.section`
  margin-top: -160px;
  z-index: 1;
`;

function Home() {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const { data: nowPlayingData, isLoading: isLoadingNowPlaying } = useQuery<IGetMoviesResult>({
    queryKey: ['movies', 'now_playing'],
    queryFn: () => getMovies('now_playing'),
  });

  const { data: popularData, isLoading: isLoadingPopular } = useQuery<IGetMoviesResult>({
    queryKey: ['movies', 'popular'],
    queryFn: () => getMovies('popular'),
  });

  const { data: topRatedData, isLoading: isLoadingTopRated } = useQuery<IGetMoviesResult>({
    queryKey: ['movies', 'top_rated'],
    queryFn: () => getMovies('top_rated'),
  });

  const { data: upcomingData, isLoading: isUpComingTopRated } = useQuery<IGetMoviesResult>({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => getMovies('upcoming'),
  });

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  if (isLoadingNowPlaying || isLoadingPopular || isLoadingTopRated || isUpComingTopRated) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <Wrapper>
      <Banner />

      <Slider>
        <MovieSlider
          movies={nowPlayingData?.results || []}
          title="현재 절찬 상영중"
          movieCategory="now_playing"
          onBoxClicked={onBoxClicked}
        />
      </Slider>
      <Slider>
        <MovieSlider
          movies={popularData?.results || []}
          title="대한민국의 TOP 10 시리즈"
          movieCategory="top_rated"
          onBoxClicked={onBoxClicked}
        />
      </Slider>
      <Slider>
        <MovieSlider
          movies={topRatedData?.results || []}
          title="지금 뜨는 콘텐츠"
          movieCategory="popular"
          onBoxClicked={onBoxClicked}
        />
      </Slider>
      <Slider>
        <MovieSlider
          movies={upcomingData?.results || []}
          title="곧 상영 예정인 기대작"
          movieCategory="upcoming"
          onBoxClicked={onBoxClicked}
        />
      </Slider>
    </Wrapper>
  );
}
export default Home;
