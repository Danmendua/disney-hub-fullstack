import React, { useState } from "react";

export default function TrailerSection({ trailers }) {
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const officialTrailers =
    trailers?.results?.filter(
      (trailer) => trailer.official && trailer.site === "YouTube"
    ) || [];

  const subtitledTrailer = officialTrailers.find((trailer) =>
    trailer.name.toLowerCase().includes("legendado")
  );

  const dubbedTrailer = officialTrailers.find(
    (trailer) => !trailer.name.toLowerCase().includes("legendado")
  );

  const defaultTrailer = officialTrailers[0];

  return (
    <div className="trailer-section mt-5 flex flex-col items-center relative">
      <div className="buttons flex gap-4 relative z-20">
        {subtitledTrailer && (
          <button
            onClick={() => setSelectedTrailer(subtitledTrailer.key)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Assistir ao Trailer Legendado
          </button>
        )}
        {subtitledTrailer && dubbedTrailer && (
          <button
            onClick={() => setSelectedTrailer(dubbedTrailer.key)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Assistir ao Trailer Dublado
          </button>
        )}
        {!subtitledTrailer && defaultTrailer && (
          <button
            onClick={() => setSelectedTrailer(defaultTrailer.key)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Assistir ao Trailer
          </button>
        )}
      </div>

      {isHovered && (
        <div className="fixed inset-0 bg-black/60 z-10 pointer-events-none"></div>
      )}

      {selectedTrailer && (
        <div
          className="mt-5 flex justify-center relative z-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedTrailer}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="relative z-20"
          ></iframe> */}
          <div className="w-[400px] h-[225px] sm:w-[500px] sm:h-[280px] md:w-[560px] md:h-[300px] lg:w-[620px] lg:h-[350px] aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${selectedTrailer}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
