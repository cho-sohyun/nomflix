import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult, IMovie } from '../api';
import { makeImagePath } from '../utils';
import { motion } from 'framer-motion';

export interface IBannerProps {
  movies: IMovie[];
}

const BannerWrap = styled.section<{ bgPhoto: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
`;

const BannerInfo = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  bottom: 0;
  padding: 0 50px;

  h2 {
    font-size: 3rem;
  }

  p {
    font-size: 1.2rem;
    width: 60%;
    height: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
  }

  div {
    display: flex;
    gap: 15px;
  }
`;

function Banner() {
  const { data: nowPlayingData, isLoading: isLoadingNowPlaying } = useQuery<IGetMoviesResult>({
    queryKey: ['movies', 'now_playing'],
    queryFn: () => getMovies('now_playing'),
  });

  if (isLoadingNowPlaying) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BannerWrap bgPhoto={makeImagePath(nowPlayingData?.results[0].backdrop_path || '')}>
        <BannerInfo>
          <motion.h2
            initial={{
              transform: 'scale(1.2)',
              transformOrigin: 'left bottom',
            }}
            animate={{
              transform: 'scale(1) translate3d(0px, 80px, 0px)',
              transition: { delay: 1, duration: 1 },
            }}
          >
            {nowPlayingData?.results[0].title}
          </motion.h2>
          <motion.p
            initial={{
              transform: 'scale(1)',
              transformOrigin: 'left bottom',
            }}
            animate={{
              transform: 'scale(0)',
              transition: { delay: 1, duration: 0 },
            }}
          >
            {nowPlayingData?.results[0].overview}
          </motion.p>
        </BannerInfo>
      </BannerWrap>
    </>
  );
}
export default Banner;
