import React from "react";

export const TagSimilarArtists = React.memo((props) => {
  const { artistTags, onTopTagsClick } = props;
  const maxTags = 20;
  return (
    <div className="artistTopTags tags">
      {artistTags && artistTags.tag.length > 0 ? (
        <div>
          <p>
            Similar tags to{" "}
            <span className="lead text-capitalize">
              {artistTags["@attr"].artist.toLowerCase()}
            </span>
          </p>

          {artistTags.tag.slice(0, maxTags).map((t, index) => (
            <p
              key={index}
              onClick={onTopTagsClick}
              className="badge badge-pill badge-primary m-1 p-2"
            >
              {t.name}
            </p>
          ))}
        </div>
      ) : (
        <div>
          <p>Similar Tags</p>
          <p className="badge badge-pill badge-secondary m-1 p-2">No Tags</p>
          <span className="text-info">
            Try clicking a tag above!
            <img
              className="arrow-up"
              src="/images/send-arrow-up.png"
              alt="up arrow"
            />
          </span>
        </div>
      )}
    </div>
  );
});
