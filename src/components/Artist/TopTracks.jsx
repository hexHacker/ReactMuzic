import React from "react";

export const TopTracks = (props) => {
  const { topTracks, onAddTrack } = props;

  return (
    <div>
      <h5 className="mb-1 text-warning">Top Tracks</h5>
      {topTracks && topTracks.length > 0 ? (
        topTracks.map((track, index) => (
          <div key={index} className="top-tracks">
            <div style={{ display: "table-cell", whiteSpace: "nowrap" }}>
              <p>
                <a
                  className="pr-1"
                  href="#fav"
                  onClick={(e) => onAddTrack(e, track)}
                  target="_blank"
                >
                  <i className="grow fa fa-plus"></i>
                </a>
                <a className="p-2" href={track.url} target="_blank">
                  <i className="grow fa fa-headphones"></i>
                </a>
              </p>
            </div>
            <div style={{ display: "table-cell" }}>
              <p>
                <span className="text-capitalize">
                  {track.name.toLowerCase()}
                </span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>None</p>
      )}
    </div>
  );
};
