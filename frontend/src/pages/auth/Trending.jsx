import React, { Suspense } from "react";
const Header = React.lazy(() => import("../../components/plus/Header"));

export default function Trending() {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
    </div>
  );
}
