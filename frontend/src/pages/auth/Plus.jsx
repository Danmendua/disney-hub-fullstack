import React, { Suspense, lazy, useEffect } from "react";
import { useMovieStore } from "../../store/useMovieStore";
import TrendingMovies from "../../components/plus/TrendingMovies";

const Header = lazy(() => import("../../components/plus/Header"));
const Slider = lazy(() => import("../../components/plus/Slider"));
const ProductionHouse = lazy(() =>
  import("../../components/plus/ProductionHouse")
);

function Plus() {
  const { getTrendingHomePage, movieHomePage, moviesSlider } = useMovieStore();

  useEffect(() => {
    const fetchMovies = async () => {
      await getTrendingHomePage();
    };
    fetchMovies();
  }, [getTrendingHomePage]);

  return (
    <Suspense fallback={null}>
      <Header />
      <Slider moviesSlider={moviesSlider} />
      <ProductionHouse />
      <TrendingMovies movieHomePage={movieHomePage} />
    </Suspense>
  );
}

export default Plus;
