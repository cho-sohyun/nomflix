const API_KEY = 'b637f9747a4cdf70f56974e50a4c7cbe';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies(type: string) {
  return fetch(`${BASE_PATH}/movie/${type}?api_key=${API_KEY}&language=ko-KR`).then((response) => response.json());
}
