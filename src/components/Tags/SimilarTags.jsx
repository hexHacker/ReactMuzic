import React from "react";

export const SimilarTags = React.memo((props) => {
  const { artistInfo, onSimilarArtistsClick } = props;

  return (
    <div className="similarTags tags py-2">
      <p>
        Similar Artists to{" "}
        <span className="lead text-capitalize">
          {artistInfo && artistInfo.name.toLowerCase()}
        </span>
      </p>
      {artistInfo && artistInfo.similar.artist.length > 0 ? (
        artistInfo.similar.artist.map((artist, index) => (
          <label
            key={index}
            onClick={onSimilarArtistsClick}
            className="badge badge-pill badge-success m-1 p-2"
          >
            {artist.name}
          </label>
        ))
      ) : (
        <label className="badge badge-pill badge-secondary m-1 p-2">
          No Artists
        </label>
      )}
    </div>
  );
});
