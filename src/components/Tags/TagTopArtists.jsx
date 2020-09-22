import React from "react";

export const TagTopArtists = React.memo((props) => {
  const { topArtists, onArtistsClick } = props;
  const maxTags = 20;
  return (
    <div className="tagTopArtists tags">
      {topArtists ? (
        <div>
          <p>
            Artists tagged with{" "}
            <span className="lead text-capitalize">
              {topArtists["@attr"].tag.toLowerCase()}
            </span>
          </p>
          {topArtists.artist.slice(0, maxTags).map((artist, index) => (
            <label
              key={index}
              onClick={onArtistsClick}
              className="badge badge-pill badge-success m-1 p-2"
            >
              {artist.name}
            </label>
          ))}
        </div>
      ) : (
        <div>
          <p>Artists tags</p>
          <label className="badge badge-pill badge-secondary m-1 p-2">
            No Tags
          </label>
        </div>
      )}
    </div>
  );
});
