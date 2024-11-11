import React, { Suspense } from "react";
import FavoriteMovies from "../../components/multicomponent/FavoriteMovies";
const Header = React.lazy(() => import("../../components/plus/Header"));

export default function Watchlist() {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <div className="m-5 md:m-14 pt-24">
        <FavoriteMovies />
      </div>
    </div>
  );
}
