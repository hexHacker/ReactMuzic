import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faMinus, faHeadphones } from "@fortawesome/free-solid-svg-icons";

export const Favorites = (props) => {
  const { favorites, onRemoveFavoriteTrack } = props;
  return (
    <div className="favorites-container">
      <div className="favorites border-light p-1">
        <p
          className="toggle m-0 p-1 pl-2"
          data-toggle="collapse"
          data-target="#favorites"
        >
          <i className="grow fa fa-heart text-warning pr-2 "></i>
          {favorites.length} favorites
        </p>

        <div id="favorites" className="collapse px-2">
          {favorites.map((fav, index) => (
            <div key={index}>
              <div style={{ display: "table-cell", whiteSpace: "nowrap" }}>
                <a
                  className="pr-2"
                  href="#fav"
                  onClick={(e) => onRemoveFavoriteTrack(e, index)}
                  target="_blank"
                >
                  <i className="grow fa fa-minus"></i>
                </a>
                <a className="pr-2" href={fav.url} target="_blank">
                  <i className="grow fa fa-headphones"></i>
                </a>
              </div>

              <div style={{ display: "table-cell" }}>
                <p className="text-capitalize">
                  <span className="text-warning">
                    {fav.artist.toLowerCase()}
                  </span>
                  <span className="">, {fav.track.toLowerCase()}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
