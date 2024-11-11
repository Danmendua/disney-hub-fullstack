import React from "react";
import {
  CircularProgressbar as ProgressBar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip } from "./Tooltip";

export default function CircularProgressBar({
  movieRate,
  movieVotes,
  size,
  position,
  location,
  customPosition = {},
}) {
  const trailColor =
    movieRate >= 7 ? "green" : movieRate >= 6 ? "yellow" : "red";

  return (
    <div
      className="relative flex justify-center items-center "
      style={customPosition}
    >
      <Tooltip message={`${movieVotes} Avaliações`} location={location}>
        <ProgressBar
          value={movieRate}
          maxValue={10}
          text={`${movieRate}`}
          background="transparent"
          styles={buildStyles({
            rotation: 1,
            strokeLinecap: "round",
            textSize: "40px",
            pathTransitionDuration: 0.5,
            pathTransition: "none",
            pathColor: trailColor,
            textColor: "#ffffff",
            trailColor: `rgba(255, 217, 0, 0.1)`,
            backgroundColor: "#1a1a2d",
          })}
          className={`${size} z-20 hover:scale-110 transition-all duration-100 ease-in ${position}`}
          style={{ pointerEvents: "auto" }}
        />
      </Tooltip>
    </div>
  );
}
